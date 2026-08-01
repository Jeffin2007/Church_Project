import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import type { Response, Request } from 'express';

import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  ACCESS_TOKEN_EXPIRY_SECONDS,
  REFRESH_TOKEN_EXPIRY_SECONDS,
} from '@qoas/constants';

import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ─── Login ─────────────────────────────────────────────────────────────────

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email/password or family number' })
  @ApiResponse({ status: 200, description: 'Login successful — tokens set in HttpOnly cookies' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    const tokens = await this.authService.login(loginDto, req.ip ?? '');

    this.setCookies(res, tokens.accessToken, tokens.refreshToken);

    return { message: 'Login successful' };
  }

  // ─── Refresh Token ────────────────────────────────────────────────────────

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh token and issue new access token' })
  @ApiCookieAuth('refresh_token')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const refreshToken = req.cookies[COOKIE_REFRESH_TOKEN] as string | undefined;
    const tokens = await this.authService.refreshTokens(refreshToken ?? '');

    this.setCookies(res, tokens.accessToken, tokens.refreshToken);

    return { message: 'Tokens refreshed' };
  }

  // ─── Logout ────────────────────────────────────────────────────────────────

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout — revoke current session' })
  @ApiCookieAuth('access_token')
  async logout(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    await this.authService.logout(user.sessionId);
    this.clearCookies(res);
    return { message: 'Logged out successfully' };
  }

  // ─── Logout All Devices ───────────────────────────────────────────────────

  @Delete('sessions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout from all devices — revoke all sessions' })
  @ApiCookieAuth('access_token')
  async logoutAll(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    await this.authService.logoutAll(user.sub);
    this.clearCookies(res);
    return { message: 'All sessions revoked' };
  }

  // ─── Current User ─────────────────────────────────────────────────────────

  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiCookieAuth('access_token')
  getMe(@CurrentUser() user: JwtPayload): JwtPayload {
    return user;
  }

  // ─── Active Sessions ──────────────────────────────────────────────────────

  @Get('sessions')
  @ApiOperation({ summary: 'List all active sessions for the current user' })
  @ApiCookieAuth('access_token')
  async getSessions(@CurrentUser('sub') userId: string): Promise<unknown[]> {
    return this.authService.getSessions(userId);
  }

  // ─── Password Reset ───────────────────────────────────────────────────────

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset email' })
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<{ message: string }> {
    await this.authService.forgotPassword(dto.email);
    return { message: 'If that email exists, a reset link has been sent.' };
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete password reset with token' })
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<{ message: string }> {
    await this.authService.resetPassword(dto.token, dto.password);
    return { message: 'Password reset successfully. Please log in again.' };
  }

  // ─── Cookie Helpers ───────────────────────────────────────────────────────

  private setCookies(res: Response, accessToken: string, refreshToken: string): void {
    const isProd = process.env['NODE_ENV'] === 'production';

    res.cookie(COOKIE_ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge: ACCESS_TOKEN_EXPIRY_SECONDS * 1000,
      path: '/',
    });

    res.cookie(COOKIE_REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge: REFRESH_TOKEN_EXPIRY_SECONDS * 1000,
      path: '/api/v1/auth/refresh',
    });
  }

  private clearCookies(res: Response): void {
    res.clearCookie(COOKIE_ACCESS_TOKEN, { path: '/' });
    res.clearCookie(COOKIE_REFRESH_TOKEN, { path: '/api/v1/auth/refresh' });
  }
}

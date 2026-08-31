/**
 * ==============================================================================
 * QUEEN OF ALL SAINTS ROMAN CATHOLIC CHURCH — PARISH WEB ACTIVITY LOGGER
 * ==============================================================================
 * Google Apps Script Webhook & Spreadsheet Synchronization Script
 * 
 * Target Spreadsheet ID: 1YWQzP5BElf8JXzTb1kmpxPnc2aTI-8mq4cfOUb25V7Y
 * Target Spreadsheet URL: https://docs.google.com/spreadsheets/d/1YWQzP5BElf8JXzTb1kmpxPnc2aTI-8mq4cfOUb25V7Y/edit
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Open https://script.google.com/
 * 2. Click "New Project" and name it "QOAS Parish Activity Logger"
 * 3. Copy and paste this entire file content into Code.gs
 * 4. Run the function `setupSpreadsheet()` once to create all sheets with beautiful headers.
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Set:
 *    - Description: "QOAS Webhook v1"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy" and copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 9. Add the Web App URL to your .env.local file:
 *    NEXT_PUBLIC_APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 * ==============================================================================
 */

var SPREADSHEET_ID = "1YWQzP5BElf8JXzTb1kmpxPnc2aTI-8mq4cfOUb25V7Y";

/**
 * Initializes and formats all logging sheets in your Google Spreadsheet.
 * Run this function once from the Apps Script editor!
 */
function setupSpreadsheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Sheet 1: Master Activity Log (All Events)
  setupSheet(ss, "Activity_Logs", [
    "Timestamp",
    "Event Type",
    "Family Code",
    "Family / User Name",
    "Role",
    "Anbiyam / Ward",
    "Status / Result",
    "Summary Details",
    "IP / Client Info"
  ], "#1e3a8a");

  // Sheet 2: Payments & Offertory
  setupSheet(ss, "Payments_Log", [
    "Timestamp",
    "Receipt No.",
    "Transaction ID",
    "Family Code",
    "Payer Name",
    "Category",
    "Amount (INR)",
    "Payment Status",
    "Payment Method",
    "Description"
  ], "#047857");

  // Sheet 3: Mass Intentions
  setupSheet(ss, "Mass_Intentions", [
    "Timestamp",
    "Intention ID",
    "Family Code",
    "Family Name",
    "Intention Type",
    "For Person / Intention",
    "Preferred Date",
    "Preferred Time",
    "Language",
    "Offering Amount (INR)",
    "Booking Status",
    "Assigned Priest / Mass"
  ], "#b45309");

  // Sheet 4: Profile Updates
  setupSheet(ss, "Profile_Updates", [
    "Timestamp",
    "Family Code",
    "Head of Family",
    "Spouse Name",
    "Contact Number",
    "Anbiyam",
    "Address",
    "Updated Fields Summary",
    "Total Members"
  ], "#4338ca");

  // Sheet 5: Anbiyam Transfer Requests
  setupSheet(ss, "Anbiyam_Transfers", [
    "Timestamp",
    "Family Code",
    "Head Name",
    "Current Anbiyam",
    "Requested Target Anbiyam",
    "Reason for Transfer",
    "Request Status",
    "Reviewed By / Action Date"
  ], "#9333ea");

  // Sheet 6: Pastoral Care & Sacraments (House Blessing, Sick Communion, Certificates)
  setupSheet(ss, "Pastoral_Requests", [
    "Timestamp",
    "Request ID",
    "Request Category",
    "Family Code",
    "Submitted By / Patient Name",
    "Preferred Date / Details",
    "Contact Number",
    "Status",
    "Assigned Clergy / Notes"
  ], "#c026d3");

  Logger.log("Spreadsheet setup completed successfully for ID: " + SPREADSHEET_ID);
}

/**
 * Helper to create, configure headers, freeze top row, and color-format a sheet.
 */
function setupSheet(ss, sheetName, headers, headerColor) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  
  // Set headers
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight("bold");
  headerRange.setFontColor("#ffffff");
  headerRange.setBackground(headerColor);
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  for (var i = 1; i <= headers.length; i++) {
    sheet.setColumnWidth(i, 160);
  }
  sheet.setColumnWidth(1, 180); // Timestamp
  sheet.setColumnWidth(headers.length - 1, 240); // Details
}

/**
 * Handles incoming POST requests from Queen of All Saints Web App
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, error: "Empty request payload" }, 400);
    }
    
    var payload = JSON.parse(e.postData.contents);
    var eventType = payload.eventType || "GENERAL_ACTIVITY";
    var timestamp = payload.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // 1. Write to Master Activity_Logs Sheet
    var logSheet = ss.getSheetByName("Activity_Logs") || ss.insertSheet("Activity_Logs");
    logSheet.appendRow([
      timestamp,
      payload.eventType || "UNKNOWN",
      payload.familyId || payload.familyCode || "N/A",
      payload.familyName || payload.userName || "Guest",
      payload.role || "Parishioner",
      payload.anbiyam || "N/A",
      payload.status || "SUCCESS",
      payload.summary || payload.details || JSON.stringify(payload.data || {}),
      payload.clientInfo || "Web Portal"
    ]);

    // 2. Route to specialized category sheets based on event type
    routeToSpecializedSheet(ss, eventType, timestamp, payload);

    return createJsonResponse({
      success: true,
      message: "Activity logged successfully to Google Sheets",
      timestamp: timestamp,
      eventType: eventType
    });
  } catch (err) {
    Logger.log("Error processing webhook: " + err.toString());
    return createJsonResponse({
      success: false,
      error: err.toString()
    }, 500);
  }
}

/**
 * Routes events to specialized sheets for detailed reporting
 */
function routeToSpecializedSheet(ss, eventType, timestamp, p) {
  var data = p.data || {};
  
  // A. PAYMENT EVENTS
  if (eventType === "PAYMENT_SUCCESS" || eventType === "PAYMENT_FAILED" || eventType === "OFFERTORY_PAID") {
    var paySheet = ss.getSheetByName("Payments_Log");
    if (paySheet) {
      paySheet.appendRow([
        timestamp,
        data.receiptNumber || p.receiptNumber || ("REC-" + new Date().getTime()),
        data.transactionId || p.transactionId || "N/A",
        p.familyId || p.familyCode || "N/A",
        p.familyName || p.userName || "Parishioner",
        data.category || p.category || "Offertory / Donation",
        data.amount || p.amount || 0,
        p.status || (eventType === "PAYMENT_FAILED" ? "FAILED" : "PAID"),
        data.method || "Razorpay / Online UPI",
        data.description || p.summary || ""
      ]);
    }
  }

  // B. MASS INTENTION EVENTS
  else if (eventType === "MASS_INTENTION_CREATED" || eventType === "MASS_INTENTION_STATUS_UPDATE") {
    var massSheet = ss.getSheetByName("Mass_Intentions");
    if (massSheet) {
      massSheet.appendRow([
        timestamp,
        data.id || p.intentionId || ("MI-" + new Date().getTime()),
        p.familyId || p.familyCode || "N/A",
        p.familyName || "Parish Family",
        data.requestType || p.requestType || "Thanksgiving Mass",
        data.personName || p.personName || "Parishioner Intention",
        data.preferredDate || p.preferredDate || "",
        data.preferredTime || p.preferredTime || "",
        data.language || "Tamil",
        data.offeringAmount || p.offeringAmount || 100,
        p.status || data.status || "PENDING_CONFIRMATION",
        data.assignedPriest || data.assignedMassDate || "Parish Clergy"
      ]);
    }
  }

  // C. PROFILE UPDATE EVENTS
  else if (eventType === "PROFILE_UPDATE" || eventType === "FAMILY_MEMBER_ADDED" || eventType === "PASSWORD_CHANGE") {
    var profSheet = ss.getSheetByName("Profile_Updates");
    if (profSheet) {
      profSheet.appendRow([
        timestamp,
        p.familyId || p.familyCode || "N/A",
        data.headName || p.headName || p.familyName || "",
        data.spouseName || "",
        data.headPhone || p.contactNo || "",
        data.anbiyam || p.anbiyam || "",
        data.address || "",
        p.summary || (eventType === "PASSWORD_CHANGE" ? "Password Updated (Encrypted)" : "Profile Information Updated"),
        data.totalMembers || (data.members ? data.members.length : "N/A")
      ]);
    }
  }

  // D. ANBIYAM TRANSFER EVENTS
  else if (eventType === "ANBIYAM_TRANSFER_REQUEST" || eventType === "ANBIYAM_TRANSFER_APPROVED" || eventType === "ANBIYAM_TRANSFER_REJECTED") {
    var anbiyamSheet = ss.getSheetByName("Anbiyam_Transfers");
    if (anbiyamSheet) {
      anbiyamSheet.appendRow([
        timestamp,
        p.familyId || p.familyCode || "N/A",
        p.familyName || data.headName || "",
        data.currentAnbiyam || p.anbiyam || "",
        data.requestedAnbiyam || data.anbiyamRequestedChange || "",
        data.reason || p.reason || "",
        eventType === "ANBIYAM_TRANSFER_APPROVED" ? "APPROVED" : (eventType === "ANBIYAM_TRANSFER_REJECTED" ? "REJECTED" : "PENDING_APPROVAL"),
        data.reviewedBy || (eventType.includes("APPROVED") ? "Rev. Fr. Parish Priest" : "Submitted by Family")
      ]);
    }
  }

  // E. PASTORAL CARE EVENTS (House Blessing, Communion for Sick, Sacrament Certificates)
  else if (
    eventType === "HOUSE_BLESSING_REQUEST" || 
    eventType === "HOME_COMMUNION_REQUEST" || 
    eventType === "SACRAMENT_CERTIFICATE_REQUEST" || 
    eventType === "PRAYER_REQUEST"
  ) {
    var pastSheet = ss.getSheetByName("Pastoral_Requests");
    if (pastSheet) {
      pastSheet.appendRow([
        timestamp,
        data.id || ("REQ-" + new Date().getTime()),
        eventType.replace(/_/g, " "),
        p.familyId || p.familyCode || "N/A",
        data.patientName || data.memberName || p.familyName || "",
        (data.preferredDate || "") + " " + (data.preferredTime || "") + " | " + (data.notes || data.purpose || ""),
        data.mobileNumber || p.contactNo || "",
        p.status || data.status || "SUBMITTED",
        data.assignedPriest || "Parish Presbytery"
      ]);
    }
  }
}

/**
 * Handles GET requests (Health Check & Statistics)
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName("Activity_Logs");
    var totalLogs = sheet ? Math.max(0, sheet.getLastRow() - 1) : 0;
    
    return createJsonResponse({
      status: "ONLINE",
      service: "Queen of All Saints Parish Web Activity Logger",
      diocese: "Diocese of Tiruchirappalli",
      spreadsheetId: SPREADSHEET_ID,
      totalActivitiesLogged: totalLogs,
      serverTime: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
    });
  } catch (err) {
    return createJsonResponse({
      status: "ERROR",
      message: err.toString()
    }, 500);
  }
}

/**
 * Utility to return standardized JSON Output with CORS headers
 */
function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

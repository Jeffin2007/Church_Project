'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Building,
  GraduationCap,
  Cross,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Save,
  Check,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  BookOpen,
  Lock,
  Users,
} from 'lucide-react';
import { useFamily, DetailedFamilyMember } from '@/context/family-context';

interface RegisterMemberWorkspaceProps {
  memberToEdit?: DetailedFamilyMember | null;
  onBack?: () => void;
  onSuccess?: () => void;
}

const DRAFT_STORAGE_KEY = 'qoas_member_registration_draft_v2';

export function RegisterMemberWorkspace({
  memberToEdit,
  onBack,
  onSuccess,
}: RegisterMemberWorkspaceProps) {
  const router = useRouter();
  const { family, addMember, updateMember } = useFamily();

  const isEditMode = !!memberToEdit;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [registeredMemberName, setRegisteredMemberName] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [declarationAccepted, setDeclarationAccepted] = useState<boolean>(false);
  const [draftToast, setDraftToast] = useState<string | null>(null);

  // Initial Form State (Data Minimization & Parish Register Purpose)
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    name: memberToEdit?.name || '',
    tamilName: memberToEdit?.tamilName || '',
    relation: (memberToEdit?.relation || 'Son') as DetailedFamilyMember['relation'],
    dob: memberToEdit?.dob || '2012-05-15',
    gender: (memberToEdit?.gender || 'MALE') as 'MALE' | 'FEMALE' | 'OTHER',
    community: memberToEdit?.community || 'BC',
    customCommunityName: '',
    placeOfBirth: memberToEdit?.placeOfBirth || 'Tiruchirappalli',

    // Step 2: Family & Contact Details
    useFamilyDetails: false,
    phone: memberToEdit?.phone || '',
    alternatePhone: memberToEdit?.alternatePhone || '',
    email: memberToEdit?.email || '',
    address: memberToEdit?.address || '',
    city: memberToEdit?.city || 'Tiruchirappalli',
    pincode: memberToEdit?.pincode || '620001',
    isFamilyHead: memberToEdit?.isFamilyHead || memberToEdit?.relation === 'Head of Family',
    isLivingWithFamily: memberToEdit?.isLivingWithFamily ?? true,
    parentGuardian: memberToEdit?.parentGuardian || '',
    schoolInstitution: memberToEdit?.schoolInstitution || '',

    // Step 3: Education & Occupation
    educationLevel: memberToEdit?.educationLevel || 'Higher Secondary',
    schoolCollege: memberToEdit?.schoolInstitution || 'St. Joseph College, Trichy',
    courseDegree: memberToEdit?.courseDegree || '',
    yearOfStudy: memberToEdit?.yearOfStudy || '',
    employmentStatus: memberToEdit?.employmentStatus || memberToEdit?.occupation || 'Student',
    occupation: memberToEdit?.occupation || 'Student',
    employer: memberToEdit?.employer || '',
    designation: memberToEdit?.designation || '',

    // Step 4: Sacramental Records (No document uploads)
    isBaptized: memberToEdit?.baptism?.completed ?? true,
    baptismDate: memberToEdit?.baptism?.date || '2012-06-20',
    baptismParish: memberToEdit?.baptism?.church || 'Queen of All Saints Church, Trichy',
    baptismRegisterNo: memberToEdit?.baptism?.registerNo || 'BAP-2012-089',

    receivedFirstCommunion: memberToEdit?.firstCommunion?.completed ?? true,
    firstHolyCommunionDate: memberToEdit?.firstCommunion?.date || '2022-05-10',
    firstHolyCommunionParish:
      memberToEdit?.firstCommunion?.church || 'Queen of All Saints Church, Trichy',
    firstHolyCommunionRegisterNo: memberToEdit?.firstCommunion?.registerNo || 'FHC-2022-045',

    isConfirmed: memberToEdit?.confirmation?.completed ?? false,
    confirmationDate: memberToEdit?.confirmation?.date || '',
    confirmationParish: memberToEdit?.confirmation?.church || '',
    confirmationRegisterNo: memberToEdit?.confirmation?.registerNo || '',

    isMarried: memberToEdit?.marriage?.completed ?? false,
    maritalStatus: (memberToEdit?.maritalStatus ||
      'Single') as DetailedFamilyMember['maritalStatus'],
    marriageDate: memberToEdit?.marriage?.date || '',
    marriageParish: memberToEdit?.marriage?.church || '',
    spouseName: memberToEdit?.marriage?.spouseName || '',
    marriageRegisterNo: memberToEdit?.marriage?.registerNo || '',

    // Medical & Pastoral Care
    bloodGroup: memberToEdit?.bloodGroup || 'O+',
    emergencyContact: memberToEdit?.emergencyContact || '',
    specialNeeds: memberToEdit?.specialNeeds || 'None',
    elderlyAssistance: memberToEdit?.elderlyAssistance ?? false,
    homeCommunionRequired: memberToEdit?.homeCommunionRequired ?? false,
    bedridden: memberToEdit?.bedridden ?? false,
  });

  // Calculate dynamic age from selected DOB
  const calculateAge = (dobString: string): number => {
    if (!dobString) return 0;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return 0;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return Math.max(0, age);
  };

  const calculatedAge = calculateAge(formData.dob);
  const isMinor = Boolean(formData.dob) && calculatedAge < 18;

  // Check for unsaved draft on load
  useEffect(() => {
    if (!isEditMode && family?.familyNumber) {
      try {
        const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (saved) {
          setHasDraft(true);
        } else {
          fetch(`/api/v1/family/members/draft/${family.familyNumber}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
              if (data?.draft) setHasDraft(true);
            })
            .catch(() => {});
        }
      } catch {}
    }
  }, [isEditMode, family?.familyNumber]);

  // Handle Family Details Inheritance without mutating family profile
  useEffect(() => {
    if (formData.useFamilyDetails && family) {
      setFormData((prev) => ({
        ...prev,
        address: family.address || '',
        phone: family.headPhone || '',
        email: family.headEmail || '',
        pincode: family.pincode || '620001',
        city: 'Tiruchirappalli',
      }));
    }
  }, [formData.useFamilyDetails, family]);

  // Load draft from localStorage or server DB
  const handleLoadDraft = async () => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || formData);
        setCurrentStep(parsed.currentStep || 1);
        setHasDraft(false);
        showToast('Registration draft restored!');
        return;
      }
      const res = await fetch(`/api/v1/family/members/draft/${family.familyNumber}`);
      if (res.ok) {
        const data = await res.json();
        if (data.draft) {
          setFormData(data.draft.formData);
          setCurrentStep(data.draft.currentStep || 1);
          setHasDraft(false);
          showToast('Server draft restored!');
        }
      }
    } catch {
      showToast('Failed to load draft');
    }
  };

  // Save draft
  const handleSaveDraft = async () => {
    try {
      const draftPayload = {
        formData,
        currentStep,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftPayload));

      fetch('/api/v1/family/members/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyId: family.familyNumber, draftData: draftPayload }),
      }).catch(() => {});

      showToast('Draft saved securely to client & server!');
    } catch {
      showToast('Error saving draft');
    }
  };

  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setHasDraft(false);
    } catch {}
  };

  const showToast = (msg: string) => {
    setDraftToast(msg);
    setTimeout(() => setDraftToast(null), 4000);
  };

  // Step Validation
  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};
    const today = new Date().toISOString().slice(0, 10);

    if (currentStep === 1) {
      if (!formData.name.trim()) errors.name = 'Full Name is required';
      if (!formData.relation) errors.relation = 'Relationship is required';
      if (!formData.dob) {
        errors.dob = 'Date of birth is required';
      } else if (formData.dob > today) {
        errors.dob = 'Date of birth cannot be in the future';
      }
    }

    if (currentStep === 2) {
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (formData.phone && formData.phone.length < 8) {
        errors.phone = 'Please enter a valid mobile number';
      }
    }

    if (currentStep === 4) {
      if (formData.isBaptized && formData.baptismDate) {
        if (formData.baptismDate > today)
          errors.baptismDate = 'Baptism date cannot be in the future';
        if (formData.dob && formData.baptismDate < formData.dob)
          errors.baptismDate = 'Baptism date cannot be earlier than Date of Birth';
      }
      if (formData.receivedFirstCommunion && formData.firstHolyCommunionDate) {
        if (formData.firstHolyCommunionDate > today)
          errors.firstHolyCommunionDate = 'First Communion date cannot be in the future';
        if (formData.dob && formData.firstHolyCommunionDate < formData.dob)
          errors.firstHolyCommunionDate = 'First Communion date cannot be earlier than DOB';
      }
      if (formData.isConfirmed && formData.confirmationDate) {
        if (formData.confirmationDate > today)
          errors.confirmationDate = 'Confirmation date cannot be in the future';
      }
      if (formData.isMarried && formData.marriageDate) {
        if (formData.marriageDate > today)
          errors.marriageDate = 'Marriage date cannot be in the future';
        if (formData.dob && formData.marriageDate < formData.dob)
          errors.marriageDate = 'Marriage date cannot be before Date of Birth';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declarationAccepted) {
      setValidationErrors({
        declaration: 'You must accept the parish record accuracy declaration.',
      });
      return;
    }

    setIsSubmitting(true);

    const finalCommunity =
      formData.community === 'Other' && formData.customCommunityName
        ? formData.customCommunityName.trim()
        : formData.community;

    const memberRecord: Omit<DetailedFamilyMember, 'id'> = {
      name: formData.name,
      tamilName: formData.tamilName,
      relation: formData.relation,
      dob: formData.dob,
      gender: formData.gender,
      community: finalCommunity,
      placeOfBirth: formData.placeOfBirth,

      phone: formData.phone || family.headPhone,
      alternatePhone: formData.alternatePhone,
      email: formData.email || family.headEmail,
      address: formData.address || family.address,
      city: formData.city,
      pincode: formData.pincode,
      isFamilyHead: formData.isFamilyHead,
      isLivingWithFamily: formData.isLivingWithFamily,
      parentGuardian: formData.parentGuardian,
      schoolInstitution: formData.schoolInstitution,

      educationLevel: formData.educationLevel,
      courseDegree: formData.courseDegree,
      yearOfStudy: formData.yearOfStudy,
      occupation: formData.occupation || formData.employmentStatus,
      employmentStatus: formData.employmentStatus,
      employer: formData.employer,
      designation: formData.designation,
      maritalStatus: formData.isMarried
        ? 'Married (Church)'
        : (formData.maritalStatus as DetailedFamilyMember['maritalStatus']),

      religion: 'Catholic Christian',
      denomination: 'Roman Catholic (Latin Rite)',
      nativeParish: family.nativeParish || 'Queen of All Saints Church, Trichy',
      diocese: family.diocese || 'Diocese of Tiruchirapalli',

      baptism: {
        completed: formData.isBaptized,
        date: formData.baptismDate,
        church: formData.baptismParish,
        parish: formData.baptismParish,
        registerNo: formData.baptismRegisterNo,
      },
      firstCommunion: {
        completed: formData.receivedFirstCommunion,
        date: formData.firstHolyCommunionDate,
        church: formData.firstHolyCommunionParish,
        registerNo: formData.firstHolyCommunionRegisterNo,
      },
      confirmation: {
        completed: formData.isConfirmed,
        date: formData.confirmationDate,
        church: formData.confirmationParish,
        registerNo: formData.confirmationRegisterNo,
      },
      marriage: {
        completed: formData.isMarried,
        date: formData.marriageDate,
        church: formData.marriageParish,
        spouseName: formData.spouseName,
        registerNo: formData.marriageRegisterNo,
      },
      holyOrders: memberToEdit?.holyOrders || { type: 'NONE', date: '' },
      religiousProfession: memberToEdit?.religiousProfession || {
        type: 'NONE',
        congregation: '',
        seminary: '',
      },
      anointingOfSick: memberToEdit?.anointingOfSick || { received: false, date: '' },

      isCatechismStudent: false,
      isChoirMember: false,
      isMinistryMember: false,
      isVolunteer: false,
      isYouthMember: false,
      isAltarServer: false,
      isLegionOfMary: false,
      isVincentDePaul: false,
      isFamilyPrayerGroup: true,

      bloodGroup: formData.bloodGroup,
      emergencyContact: formData.emergencyContact || family.headPhone,
      specialNeeds: formData.specialNeeds,
      elderlyAssistance: formData.elderlyAssistance,
      homeCommunionRequired: formData.homeCommunionRequired,
      bedridden: formData.bedridden,
    };

    setTimeout(() => {
      if (isEditMode && memberToEdit) {
        updateMember(memberToEdit.id, memberRecord);
      } else {
        addMember(memberRecord);
      }
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {}

      setIsSubmitting(false);
      setRegisteredMemberName(formData.name);
      setIsSubmitted(true);
    }, 800);
  };

  const steps = [
    { num: 1, label: 'Personal', icon: User },
    { num: 2, label: 'Family & Contact', icon: Building },
    { num: 3, label: 'Education & Work', icon: GraduationCap },
    { num: 4, label: 'Sacraments', icon: Cross },
    { num: 5, label: 'Review & Submit', icon: CheckCircle2 },
  ];

  // All 15 Parish Relationship choices
  const relationshipChoices = [
    { label: 'Family Head', value: 'Head of Family' },
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Son', value: 'Son' },
    { label: 'Daughter', value: 'Daughter' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Grandfather', value: 'Grandfather' },
    { label: 'Grandmother', value: 'Grandmother' },
    { label: 'Grandson', value: 'Grandson' },
    { label: 'Granddaughter', value: 'Granddaughter' },
    { label: 'Son-in-Law / Daughter-in-Law', value: 'Son-in-Law / Daughter-in-Law' },
    { label: 'Relative', value: 'Relative' },
    { label: 'Other', value: 'Other' },
  ];

  // SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <div className="animate-in fade-in mx-auto max-w-4xl space-y-8 px-4 py-8">
        <div className="bg-card relative space-y-6 overflow-hidden rounded-3xl border-2 border-emerald-500/40 p-8 text-center shadow-2xl sm:p-12">
          <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

          <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-full border-2 border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              {isEditMode ? 'Parish Record Updated' : 'Registration Complete'}
            </span>
            <h1 className="font-heading text-foreground text-3xl font-black sm:text-4xl">
              {isEditMode
                ? 'Member Profile Updated Successfully!'
                : 'Family Member Registered Successfully!'}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-lg text-sm">
              <strong className="text-foreground">{registeredMemberName}</strong> has been recorded
              in the Queen of All Saints parish register under Family Code{' '}
              <span className="text-primary font-bold">{family.familyNumber}</span>.
            </p>
          </div>

          <div className="bg-muted/40 border-border mx-auto grid max-w-md grid-cols-2 gap-4 rounded-2xl border p-4 text-xs font-semibold">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">Family Code</span>
              <span className="text-foreground font-bold">{family.familyNumber}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">
                Anbiyam Ward
              </span>
              <span className="text-foreground font-bold">
                {family.anbiyam || 'St. Thomas Anbiyam'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">
                Member Status
              </span>
              <span className="inline-flex items-center gap-1 font-extrabold text-emerald-400">
                ● ACTIVE PARISHIONER
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">
                Sacraments Recorded
              </span>
              <span className="text-gold-300 font-bold">
                {[
                  formData.isBaptized ? 'Baptism' : null,
                  formData.receivedFirstCommunion ? 'Communion' : null,
                  formData.isConfirmed ? 'Confirmation' : null,
                  formData.isMarried ? 'Matrimony' : null,
                ]
                  .filter(Boolean)
                  .join(', ') || 'Registered'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                if (onSuccess) onSuccess();
                else router.push('/family/members');
              }}
              className="from-gold-400 to-gold-600 flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105"
            >
              <Users className="h-4 w-4" />
              <span>Back to Family Members Directory</span>
            </button>

            {!isEditMode && (
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    ...formData,
                    name: '',
                    tamilName: '',
                    dob: '2015-01-01',
                    relation: 'Son',
                  });
                }}
                className="border-border bg-card hover:bg-muted text-foreground flex items-center gap-2 rounded-xl border px-6 py-3 text-xs font-bold transition-colors"
              >
                <Sparkles className="text-primary h-4 w-4" />
                <span>Register Another Member</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl space-y-6 px-2 pb-16 sm:px-4">
      {/* Toast Notification */}
      {draftToast && (
        <div className="animate-in slide-in-from-bottom-5 fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-amber-500/60 bg-slate-900 px-5 py-3 text-xs font-bold text-amber-300 shadow-2xl">
          <Save className="h-4 w-4 animate-pulse text-amber-400" />
          <span>{draftToast}</span>
        </div>
      )}

      {/* Unsaved Draft Prompt */}
      {hasDraft && !isEditMode && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-amber-500/30 bg-amber-500/10 p-4 text-xs">
          <div className="flex items-center gap-2 font-bold text-foreground dark:text-amber-300">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
            <span>You have an unsaved registration draft in progress. Restore draft?</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadDraft}
              className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-4 py-1.5 font-black text-slate-950 shadow transition-all hover:scale-105"
            >
              Restore Draft
            </button>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="text-muted-foreground hover:text-foreground px-3 py-1.5 font-semibold"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Workspace Page Header */}
      <div className="bg-card border-border/80 space-y-4 rounded-3xl border-2 p-5 shadow-xl sm:p-6">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <div>
            <button
              type="button"
              onClick={() => {
                if (onBack) onBack();
                else router.push('/family/members');
              }}
              className="text-muted-foreground hover:text-primary mb-2 inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Back to Family Profile</span>
            </button>

            <h1 className="font-heading text-foreground flex items-center gap-2 text-2xl font-extrabold sm:text-3xl">
              <span>
                {isEditMode ? `Edit Member: ${memberToEdit.name}` : 'Register Family Member'}
              </span>
            </h1>
            <p className="text-muted-foreground text-xs font-medium">
              {isEditMode
                ? 'Update parish family record and sacramental details.'
                : 'Add a member to your Queen of All Saints official parish family register.'}
            </p>
          </div>

          {!isEditMode && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 px-4 py-2 text-xs font-extrabold text-foreground hover:text-amber-400 transition-all hover:bg-amber-500/10 dark:text-amber-300"
              >
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </button>
            </div>
          )}
        </div>

        {/* Compact Family Context Banner */}
        <div className="bg-muted/40 border-border/60 grid grid-cols-2 gap-4 rounded-2xl border p-4 text-xs sm:grid-cols-4">
          <div>
            <span className="text-muted-foreground block text-[10px] font-extrabold uppercase tracking-wider">
              Family Code
            </span>
            <span className="text-primary text-sm font-black">
              {family.familyNumber || 'QOAS-2024-0001'}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-extrabold uppercase tracking-wider">
              Family Name
            </span>
            <span className="text-foreground font-bold">{family.name || 'St. Mary Family'}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-extrabold uppercase tracking-wider">
              Anbiyam Ward
            </span>
            <span className="text-foreground font-bold">
              {family.anbiyam || 'St. Thomas Anbiyam'}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-extrabold uppercase tracking-wider">
              Family Head
            </span>
            <span className="text-foreground font-bold">{family.headName || 'Joseph Anthony'}</span>
          </div>
        </div>
      </div>

      {/* Multi-Step Stepper Header */}
      <div className="bg-card border-border/80 rounded-3xl border-2 p-3 shadow-xl sm:p-6">
        <div className="bg-primary/10 border-primary/30 text-primary mb-3 flex items-center justify-center gap-2 rounded-xl border p-2 text-center text-xs font-bold sm:hidden">
          <span>Step {currentStep} of 5:</span>
          <span className="text-foreground font-extrabold">{steps[currentStep - 1].label}</span>
        </div>

        <div className="relative grid grid-cols-5 gap-1.5 sm:gap-2">
          {steps.map((s) => {
            const isCompleted = s.num < currentStep;
            const isActive = s.num === currentStep;
            const IconComponent = s.icon;

            return (
              <button
                type="button"
                key={s.num}
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                disabled={s.num > currentStep}
                className={`flex flex-col items-center rounded-2xl p-1.5 text-center transition-all sm:p-2 ${
                  isActive
                    ? 'bg-secondary/15 border-secondary/60 text-secondary border-2'
                    : isCompleted
                      ? 'hover:bg-muted cursor-pointer text-emerald-800 dark:text-emerald-300'
                      : 'text-muted-foreground/60 cursor-not-allowed opacity-60'
                }`}
              >
                <div
                  className={`mb-1 flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black transition-transform sm:mb-1.5 sm:h-11 sm:w-11 sm:text-sm ${
                    isActive
                      ? 'from-gold-400 to-gold-600 bg-gradient-to-r text-slate-950 shadow-md'
                      : isCompleted
                        ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                        : 'bg-muted border-border text-muted-foreground border'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[3] sm:h-5 sm:w-5" />
                  ) : (
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </div>
                <span className="hidden text-[9px] font-extrabold tracking-tight sm:block sm:text-xs">
                  Step {s.num}
                </span>
                <span className="hidden max-w-[55px] truncate text-[9px] font-bold sm:block sm:max-w-none sm:text-xs">
                  {s.label}
                </span>
                <span className="text-[10px] font-black sm:hidden">{s.num}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-card border-border/80 space-y-6 rounded-3xl border-2 p-5 shadow-xl sm:p-8">
        {/* STEP 1: PERSONAL DETAILS */}
        {currentStep === 1 && (
          <div className="animate-in fade-in space-y-6">
            <div className="border-border/60 border-b pb-3">
              <h2 className="font-heading text-foreground flex items-center gap-2 text-xl font-bold">
                <User className="text-primary h-5 w-5" />
                <span>Step 1: Personal Details</span>
              </h2>
              <p className="text-muted-foreground text-xs font-medium">
                Enter core identification details as maintained in the parish census register.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-foreground text-xs font-bold">Full Name (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anthony Joseph"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (validationErrors.name) setValidationErrors({});
                  }}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                />
                {validationErrors.name && (
                  <p className="text-destructive mt-1 text-[11px] font-bold">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              {/* Tamil Name */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Tamil Name (Optional)</label>
                <input
                  type="text"
                  placeholder="உம்: அந்தோணி ஜோசப்"
                  value={formData.tamilName}
                  onChange={(e) => setFormData({ ...formData, tamilName: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>

              {/* Relationship Dropdown */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">
                  Relationship to Family Head *
                </label>
                <select
                  value={formData.relation}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      relation: e.target.value as DetailedFamilyMember['relation'],
                      isFamilyHead: e.target.value === 'Head of Family',
                    });
                    if (validationErrors.relation) setValidationErrors({});
                  }}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                >
                  {relationshipChoices.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {validationErrors.relation && (
                  <p className="text-destructive mt-1 text-[11px] font-bold">
                    {validationErrors.relation}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => {
                    setFormData({ ...formData, dob: e.target.value });
                    if (validationErrors.dob) setValidationErrors({});
                  }}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                />
                {validationErrors.dob && (
                  <p className="text-destructive mt-1 text-[11px] font-bold">
                    {validationErrors.dob}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as 'MALE' | 'FEMALE' | 'OTHER',
                    })
                  }
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Community Category */}
              <div className="space-y-1">
                <label className="text-foreground flex items-center justify-between text-xs font-bold">
                  <span>Community</span>
                  <span className="text-muted-foreground flex items-center gap-1 text-[10px] font-semibold">
                    <Lock className="text-gold-400 h-3 w-3" /> Confidential Record
                  </span>
                </label>
                {isEditMode ? (
                  <div className="bg-muted/40 border-border text-muted-foreground flex w-full items-center gap-2 rounded-xl border p-3 text-xs font-medium">
                    <Lock className="text-gold-400 h-4 w-4 flex-shrink-0" />
                    <span>
                      Confidential Record — Visible exclusively to the Parish Office (Contact Parish
                      Office to request corrections).
                    </span>
                  </div>
                ) : (
                  <>
                    <select
                      value={formData.community}
                      onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                      className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                    >
                      <option value="BC">BC (Backward Class)</option>
                      <option value="MBC">MBC (Most Backward Class)</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                      <option value="BCM">BCM (Backward Class Muslim)</option>
                      <option value="SCA">SCA (Scheduled Caste Arunthathiyar)</option>
                      <option value="OC">OC (Open Competition / General)</option>
                      <option value="Other">Other Community</option>
                    </select>
                    <p className="text-muted-foreground text-[10px] font-medium">
                      Community categories reflect approved parish register requirements for
                      official record-keeping.
                    </p>
                  </>
                )}
              </div>

              {/* Custom Community Name if Other selected (only during new registration) */}
              {!isEditMode && formData.community === 'Other' && (
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-foreground text-xs font-bold">Community Name</label>
                  <input
                    type="text"
                    placeholder="Specify community name"
                    value={formData.customCommunityName}
                    onChange={(e) =>
                      setFormData({ ...formData, customCommunityName: e.target.value })
                    }
                    className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                  />
                </div>
              )}

              {/* Place of Birth */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">
                  Place of Birth (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Trichy / Madurai"
                  value={formData.placeOfBirth}
                  onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: FAMILY & CONTACT DETAILS */}
        {currentStep === 2 && (
          <div className="animate-in fade-in space-y-6">
            <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-3">
              <div>
                <h2 className="font-heading text-foreground flex items-center gap-2 text-xl font-bold">
                  <Building className="text-primary h-5 w-5" />
                  <span>Step 2: Family & Contact Details</span>
                </h2>
                <p className="text-muted-foreground text-xs font-medium">
                  Contact information for communication and parish pastoral care.
                </p>
              </div>

              {/* Inherit Family Details Toggle */}
              <label className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors">
                <input
                  type="checkbox"
                  checked={formData.useFamilyDetails}
                  onChange={(e) => setFormData({ ...formData, useFamilyDetails: e.target.checked })}
                  className="accent-primary h-4 w-4 rounded"
                />
                <span>Use Family Profile Contact & Address</span>
              </label>
            </div>

            {formData.useFamilyDetails && (
              <div className="flex items-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3 text-xs font-bold text-blue-300">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <span>
                  Address and phone numbers are pre-filled from Family Profile ({family.name}).
                  Individual edits are saved for this member.
                </span>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="text-foreground flex items-center justify-between text-xs font-bold">
                  <span>Mobile Number</span>
                  {formData.useFamilyDetails && (
                    <span className="text-[10px] font-extrabold text-blue-400">🔒 Inherited</span>
                  )}
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                />
                {validationErrors.phone && (
                  <p className="text-destructive mt-1 text-[11px] font-bold">
                    {validationErrors.phone}
                  </p>
                )}
              </div>

              {/* Alternate Mobile */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Alternate Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 98421 00000"
                  value={formData.alternatePhone}
                  onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-foreground flex items-center justify-between text-xs font-bold">
                  <span>Email Address</span>
                  {formData.useFamilyDetails && (
                    <span className="text-[10px] font-extrabold text-blue-400">🔒 Inherited</span>
                  )}
                </label>
                <input
                  type="email"
                  placeholder="member@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
                {validationErrors.email && (
                  <p className="text-destructive mt-1 text-[11px] font-bold">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Current Address */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-foreground flex items-center justify-between text-xs font-bold">
                  <span>Current Residential Address</span>
                  {formData.useFamilyDetails && (
                    <span className="text-[10px] font-extrabold text-blue-400">🔒 Inherited</span>
                  )}
                </label>
                <textarea
                  rows={2}
                  placeholder="Street Address, Area"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full resize-none rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>

              {/* City / Town */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">City / Town</label>
                <input
                  type="text"
                  placeholder="Tiruchirappalli"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>

              {/* Pincode */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Pincode</label>
                <input
                  type="text"
                  placeholder="620001"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>

              {/* Residence Status Toggles */}
              <div className="bg-muted/30 border-border/60 grid gap-4 rounded-2xl border p-4 sm:col-span-2 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isLivingWithFamily}
                    onChange={(e) =>
                      setFormData({ ...formData, isLivingWithFamily: e.target.checked })
                    }
                    className="accent-primary h-4 w-4 rounded"
                  />
                  <div>
                    <span className="text-foreground block text-xs font-bold">
                      Currently living with family
                    </span>
                    <span className="text-muted-foreground text-[10px]">
                      Resides at main family residence
                    </span>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isFamilyHead}
                    onChange={(e) => setFormData({ ...formData, isFamilyHead: e.target.checked })}
                    className="accent-primary h-4 w-4 rounded"
                  />
                  <div>
                    <span className="text-foreground block text-xs font-bold">
                      Is Primary Family Head?
                    </span>
                    <span className="text-muted-foreground text-[10px]">
                      Designates family head status
                    </span>
                  </div>
                </label>
              </div>

              {/* Dynamic Minor Section based on selected DOB age */}
              {isMinor && (
                <div className="bg-gold-500/10 border-gold-400/50 animate-in fade-in space-y-4 rounded-2xl border-2 p-4 sm:col-span-2">
                  <span className="text-gold-300 flex items-center gap-1.5 text-xs font-extrabold">
                    <ShieldCheck className="text-gold-400 h-4 w-4" />
                    Minor Member Guardian Details (Age: {calculatedAge} yrs based on selected DOB)
                  </span>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-foreground text-xs font-bold">
                        Parent / Guardian Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Joseph Anthony"
                        value={formData.parentGuardian}
                        onChange={(e) =>
                          setFormData({ ...formData, parentGuardian: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-foreground text-xs font-bold">
                        School / Institution
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Campion Higher Secondary School"
                        value={formData.schoolInstitution}
                        onChange={(e) =>
                          setFormData({ ...formData, schoolInstitution: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: EDUCATION & OCCUPATION */}
        {currentStep === 3 && (
          <div className="animate-in fade-in space-y-6">
            <div className="border-border/60 border-b pb-3">
              <h2 className="font-heading text-foreground flex items-center gap-2 text-xl font-bold">
                <GraduationCap className="text-primary h-5 w-5" />
                <span>Step 3: Education & Occupation</span>
              </h2>
              <p className="text-muted-foreground text-xs font-medium">
                Educational qualifications and work information.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Education Level */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Education Level</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                >
                  <option value="Primary School">Primary School</option>
                  <option value="Secondary School">Secondary School</option>
                  <option value="Higher Secondary">Higher Secondary (HSC)</option>
                  <option value="Diploma">Diploma / Vocational</option>
                  <option value="Bachelor's Degree">Bachelor's Degree (Undergraduate)</option>
                  <option value="Master's Degree">Master's Degree (Postgraduate)</option>
                  <option value="Doctorate / PhD">Doctorate / PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* School / College Name */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">
                  School / College / Institution
                </label>
                <input
                  type="text"
                  placeholder="Institution Name"
                  value={formData.schoolCollege}
                  onChange={(e) => setFormData({ ...formData, schoolCollege: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>

              {/* Course / Degree */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Course / Degree Major</label>
                <input
                  type="text"
                  placeholder="e.g. B.Sc. Computer Science / Commerce"
                  value={formData.courseDegree}
                  onChange={(e) => setFormData({ ...formData, courseDegree: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>

              {/* Year of Study / Graduation */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">
                  Year of Study / Graduation
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2024 - 2026"
                  value={formData.yearOfStudy}
                  onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
                />
              </div>

              {/* Employment Status */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Employment Status</label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                >
                  <option value="Employed">Employed (Salaried)</option>
                  <option value="Self-Employed">Self-Employed / Business</option>
                  <option value="Student">Student</option>
                  <option value="Homemaker">Homemaker</option>
                  <option value="Retired">Retired</option>
                  <option value="Unemployed">Seeking Employment</option>
                </select>
              </div>

              {/* Occupation */}
              <div className="space-y-1">
                <label className="text-foreground text-xs font-bold">Occupation / Profession</label>
                <input
                  type="text"
                  placeholder="e.g. Civil Engineer / School Teacher"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="bg-background border-border text-foreground focus:ring-primary w-full rounded-xl border p-3 text-xs font-bold outline-none focus:ring-2"
                />
              </div>

              {/* Show Employer & Designation if Employed / Self-Employed */}
              {(formData.employmentStatus === 'Employed' ||
                formData.employmentStatus === 'Self-Employed') && (
                <>
                  <div className="space-y-1">
                    <label className="text-foreground text-xs font-bold">
                      Employer / Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.employer}
                      onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                      className="bg-background border-border text-foreground w-full rounded-xl border p-3 text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-foreground text-xs font-bold">Designation / Role</label>
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="bg-background border-border text-foreground w-full rounded-xl border p-3 text-xs outline-none"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: SACRAMENTAL DETAILS (Clean structured info - No Document Uploads) */}
        {currentStep === 4 && (
          <div className="animate-in fade-in space-y-6">
            <div className="border-border/60 border-b pb-3">
              <h2 className="font-heading text-foreground flex items-center gap-2 text-xl font-bold">
                <Cross className="text-primary h-5 w-5" />
                <span>Step 4: Catholic Sacramental Register</span>
              </h2>
              <p className="text-muted-foreground text-xs font-medium">
                Record Catholic sacraments and canonical register numbers for parish records.
              </p>
            </div>

            <div className="space-y-6">
              {/* 1. BAPTISM */}
              <div className="bg-muted/30 space-y-4 rounded-2xl border-2 border-emerald-500/30 p-5">
                <div className="border-border/40 flex items-center justify-between border-b pb-3">
                  <div className="font-heading flex items-center gap-2 text-sm font-extrabold text-emerald-400">
                    <Cross className="h-4 w-4" />
                    <span>Sacrament of Holy Baptism</span>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-extrabold">
                    <input
                      type="checkbox"
                      checked={formData.isBaptized}
                      onChange={(e) => setFormData({ ...formData, isBaptized: e.target.checked })}
                      className="h-4 w-4 rounded accent-emerald-500"
                    />
                    <span
                      className={formData.isBaptized ? 'text-emerald-400' : 'text-muted-foreground'}
                    >
                      {formData.isBaptized ? '✓ Baptized' : 'Not Baptized'}
                    </span>
                  </label>
                </div>

                {formData.isBaptized && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Baptism Date
                      </label>
                      <input
                        type="date"
                        value={formData.baptismDate}
                        onChange={(e) => setFormData({ ...formData, baptismDate: e.target.value })}
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                      {validationErrors.baptismDate && (
                        <p className="text-destructive mt-1 text-[11px] font-bold">
                          {validationErrors.baptismDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Parish / Church Name
                      </label>
                      <input
                        type="text"
                        placeholder="Church Name"
                        value={formData.baptismParish}
                        onChange={(e) =>
                          setFormData({ ...formData, baptismParish: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Register Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BAP-2012-089"
                        value={formData.baptismRegisterNo}
                        onChange={(e) =>
                          setFormData({ ...formData, baptismRegisterNo: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. FIRST HOLY COMMUNION */}
              <div className="bg-muted/30 border-gold-500/30 space-y-4 rounded-2xl border-2 p-5">
                <div className="border-border/40 flex items-center justify-between border-b pb-3">
                  <div className="font-heading text-gold-300 flex items-center gap-2 text-sm font-extrabold">
                    <span>🍞 First Holy Communion</span>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-extrabold">
                    <input
                      type="checkbox"
                      checked={formData.receivedFirstCommunion}
                      onChange={(e) =>
                        setFormData({ ...formData, receivedFirstCommunion: e.target.checked })
                      }
                      className="accent-gold-400 h-4 w-4 rounded"
                    />
                    <span
                      className={
                        formData.receivedFirstCommunion ? 'text-gold-300' : 'text-muted-foreground'
                      }
                    >
                      {formData.receivedFirstCommunion ? '✓ Received' : 'Not Received'}
                    </span>
                  </label>
                </div>

                {formData.receivedFirstCommunion && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Communion Date
                      </label>
                      <input
                        type="date"
                        value={formData.firstHolyCommunionDate}
                        onChange={(e) =>
                          setFormData({ ...formData, firstHolyCommunionDate: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                      {validationErrors.firstHolyCommunionDate && (
                        <p className="text-destructive mt-1 text-[11px] font-bold">
                          {validationErrors.firstHolyCommunionDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Parish / Church Name
                      </label>
                      <input
                        type="text"
                        placeholder="Church Name"
                        value={formData.firstHolyCommunionParish}
                        onChange={(e) =>
                          setFormData({ ...formData, firstHolyCommunionParish: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Register Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. FHC-2022-045"
                        value={formData.firstHolyCommunionRegisterNo}
                        onChange={(e) =>
                          setFormData({ ...formData, firstHolyCommunionRegisterNo: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 3. CONFIRMATION */}
              <div className="bg-muted/30 space-y-4 rounded-2xl border-2 border-blue-500/30 p-5">
                <div className="border-border/40 flex items-center justify-between border-b pb-3">
                  <div className="font-heading flex items-center gap-2 text-sm font-extrabold text-blue-400">
                    <span>🕊️ Sacrament of Confirmation</span>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-extrabold">
                    <input
                      type="checkbox"
                      checked={formData.isConfirmed}
                      onChange={(e) => setFormData({ ...formData, isConfirmed: e.target.checked })}
                      className="h-4 w-4 rounded accent-blue-500"
                    />
                    <span
                      className={formData.isConfirmed ? 'text-blue-400' : 'text-muted-foreground'}
                    >
                      {formData.isConfirmed ? '✓ Confirmed' : 'Not Confirmed'}
                    </span>
                  </label>
                </div>

                {formData.isConfirmed && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Confirmation Date
                      </label>
                      <input
                        type="date"
                        value={formData.confirmationDate}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmationDate: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                      {validationErrors.confirmationDate && (
                        <p className="text-destructive mt-1 text-[11px] font-bold">
                          {validationErrors.confirmationDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Parish / Church Name
                      </label>
                      <input
                        type="text"
                        placeholder="Church Name"
                        value={formData.confirmationParish}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmationParish: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Register Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CONF-2024-012"
                        value={formData.confirmationRegisterNo}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmationRegisterNo: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. MARRIAGE */}
              <div className="bg-muted/30 space-y-4 rounded-2xl border-2 border-purple-500/30 p-5">
                <div className="border-border/40 flex items-center justify-between border-b pb-3">
                  <div className="font-heading flex items-center gap-2 text-sm font-extrabold text-purple-400">
                    <span>💍 Sacrament of Holy Matrimony</span>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-extrabold">
                    <input
                      type="checkbox"
                      checked={formData.isMarried}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isMarried: e.target.checked,
                          maritalStatus: e.target.checked ? 'Married (Church)' : 'Single',
                        })
                      }
                      className="h-4 w-4 rounded accent-purple-500"
                    />
                    <span
                      className={formData.isMarried ? 'text-purple-400' : 'text-muted-foreground'}
                    >
                      {formData.isMarried ? '✓ Married' : 'Single / Unmarried'}
                    </span>
                  </label>
                </div>

                {formData.isMarried && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Marriage Date
                      </label>
                      <input
                        type="date"
                        value={formData.marriageDate}
                        onChange={(e) => setFormData({ ...formData, marriageDate: e.target.value })}
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                      {validationErrors.marriageDate && (
                        <p className="text-destructive mt-1 text-[11px] font-bold">
                          {validationErrors.marriageDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Spouse Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Spouse Name"
                        value={formData.spouseName}
                        onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-muted-foreground text-xs font-bold">
                        Marriage Parish / Church
                      </label>
                      <input
                        type="text"
                        placeholder="Church Name"
                        value={formData.marriageParish}
                        onChange={(e) =>
                          setFormData({ ...formData, marriageParish: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-3">
                      <label className="text-muted-foreground text-xs font-bold">
                        Marriage Register Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. MAT-2020-033"
                        value={formData.marriageRegisterNo}
                        onChange={(e) =>
                          setFormData({ ...formData, marriageRegisterNo: e.target.value })
                        }
                        className="bg-background border-border text-foreground w-full max-w-xs rounded-xl border p-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & SUBMIT */}
        {currentStep === 5 && (
          <div className="animate-in fade-in space-y-6">
            <div className="border-border/60 border-b pb-3">
              <h2 className="font-heading text-foreground flex items-center gap-2 text-xl font-bold">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Step 5: Review & Submit Registration</span>
              </h2>
              <p className="text-muted-foreground text-xs font-medium">
                Verify details before saving to the Queen of All Saints parish register.
              </p>
            </div>

            <div className="space-y-4">
              {/* Section 1: Personal Details */}
              <div className="bg-muted/30 border-border space-y-3 rounded-2xl border p-5">
                <div className="border-border/40 flex items-center justify-between border-b pb-2">
                  <h3 className="font-heading text-foreground flex items-center gap-2 text-sm font-extrabold">
                    <User className="text-primary h-4 w-4" /> Personal Information
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Edit Step 1
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Full Name</span>
                    <span className="text-foreground font-bold">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Tamil Name</span>
                    <span className="text-foreground font-semibold">
                      {formData.tamilName || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Relationship</span>
                    <span className="text-primary font-bold">{formData.relation}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Date of Birth</span>
                    <span className="text-foreground font-bold">
                      {formData.dob} ({calculatedAge} yrs)
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Gender</span>
                    <span className="text-foreground font-semibold">{formData.gender}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Community</span>
                    <span className="text-gold-300 font-bold">
                      {formData.community === 'Other' && formData.customCommunityName
                        ? formData.customCommunityName
                        : formData.community}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Place of Birth</span>
                    <span className="text-foreground font-semibold">
                      {formData.placeOfBirth || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Family & Contact */}
              <div className="bg-muted/30 border-border space-y-3 rounded-2xl border p-5">
                <div className="border-border/40 flex items-center justify-between border-b pb-2">
                  <h3 className="font-heading text-foreground flex items-center gap-2 text-sm font-extrabold">
                    <Building className="text-primary h-4 w-4" /> Family Contact & Residence
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Edit Step 2
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Mobile</span>
                    <span className="text-foreground font-bold">
                      {formData.phone || family.headPhone}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Email</span>
                    <span className="text-foreground font-semibold">
                      {formData.email || family.headEmail}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground block text-[10px]">Address</span>
                    <span className="text-foreground font-semibold">
                      {formData.address || family.address}, {formData.city} - {formData.pincode}
                    </span>
                  </div>
                  {isMinor && (
                    <>
                      <div>
                        <span className="text-muted-foreground block text-[10px]">Guardian</span>
                        <span className="text-gold-300 font-bold">
                          {formData.parentGuardian || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px]">School</span>
                        <span className="text-foreground font-semibold">
                          {formData.schoolInstitution || 'N/A'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Section 3: Education & Occupation */}
              <div className="bg-muted/30 border-border space-y-3 rounded-2xl border p-5">
                <div className="border-border/40 flex items-center justify-between border-b pb-2">
                  <h3 className="font-heading text-foreground flex items-center gap-2 text-sm font-extrabold">
                    <GraduationCap className="text-primary h-4 w-4" /> Education & Work
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Edit Step 3
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Education Level</span>
                    <span className="text-foreground font-semibold">{formData.educationLevel}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Occupation Status
                    </span>
                    <span className="text-foreground font-bold">{formData.employmentStatus}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Institution / Company
                    </span>
                    <span className="text-foreground font-semibold">
                      {formData.schoolCollege || formData.employer || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Course / Designation
                    </span>
                    <span className="text-foreground font-semibold">
                      {formData.courseDegree || formData.designation || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4: Sacramental Records */}
              <div className="bg-muted/30 border-border space-y-3 rounded-2xl border p-5">
                <div className="border-border/40 flex items-center justify-between border-b pb-2">
                  <h3 className="font-heading text-foreground flex items-center gap-2 text-sm font-extrabold">
                    <Cross className="text-primary h-4 w-4" /> Catholic Sacraments
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Edit Step 4
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Baptism</span>
                    <span
                      className={
                        formData.isBaptized ? 'font-bold text-emerald-400' : 'text-muted-foreground'
                      }
                    >
                      {formData.isBaptized ? `Yes (${formData.baptismDate})` : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">First Communion</span>
                    <span
                      className={
                        formData.receivedFirstCommunion
                          ? 'text-gold-300 font-bold'
                          : 'text-muted-foreground'
                      }
                    >
                      {formData.receivedFirstCommunion
                        ? `Yes (${formData.firstHolyCommunionDate})`
                        : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Confirmation</span>
                    <span
                      className={
                        formData.isConfirmed ? 'font-bold text-blue-400' : 'text-muted-foreground'
                      }
                    >
                      {formData.isConfirmed ? `Yes (${formData.confirmationDate})` : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Holy Matrimony</span>
                    <span
                      className={
                        formData.isMarried ? 'font-bold text-purple-400' : 'text-muted-foreground'
                      }
                    >
                      {formData.isMarried ? `Yes (${formData.marriageDate})` : 'Single'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div className="bg-card border-gold-400/40 space-y-3 rounded-2xl border-2 p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  checked={declarationAccepted}
                  onChange={(e) => {
                    setDeclarationAccepted(e.target.checked);
                    if (validationErrors.declaration) setValidationErrors({});
                  }}
                  className="accent-primary mt-0.5 h-5 w-5 rounded"
                />
                <span className="text-foreground text-xs font-bold leading-relaxed">
                  By submitting this registration, I confirm that all information provided is
                  accurate according to official family records of Queen of All Saints Church.
                </span>
              </label>
              {validationErrors.declaration && (
                <p className="text-destructive flex items-center gap-1 pl-8 text-xs font-bold">
                  <AlertCircle className="h-4 w-4" /> {validationErrors.declaration}
                </p>
              )}
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BUTTONS BAR */}
        <div className="border-border/60 flex w-full flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <button
            type="button"
            onClick={
              currentStep === 1
                ? onBack
                  ? onBack
                  : () => router.push('/family/members')
                : handlePrevStep
            }
            className="border-border hover:bg-muted text-foreground flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-xs font-bold transition-colors sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{currentStep === 1 ? 'Cancel & Return' : 'Back'}</span>
          </button>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            {!isEditMode && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="border-gold-400/40 text-gold-300 hover:bg-gold-500/10 flex w-full items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all sm:w-auto"
              >
                <Save className="h-4 w-4" />
                <span>Save as Draft</span>
              </button>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="from-gold-400 to-gold-600 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-6 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-[1.02] sm:w-auto"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3 text-xs font-black text-white shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>{isEditMode ? 'Updating profile...' : 'Registering member...'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isEditMode ? 'Save Member Changes' : 'Register Family Member'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* GALATIANS 3:28 BIBLE VERSE & CATHOLIC CHURCH EQUALITY & PRIVACY DISCLAIMER */}
      <div className="bg-card border-gold-400/30 relative mt-8 space-y-4 overflow-hidden rounded-3xl border-2 p-6 shadow-xl sm:p-8">
        <div className="via-gold-300 absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <div className="bg-gold-500/15 border-gold-400/40 text-gold-300 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="space-y-2 text-xs leading-relaxed">
            <p className="text-gold-300 font-serif text-sm font-semibold italic sm:text-base">
              &ldquo;There is neither Jew nor Greek, there is neither slave nor free, there is no
              male and female, for you are all one in Christ Jesus.&rdquo;
            </p>
            <p className="text-gold-400/90 text-[11px] font-extrabold uppercase tracking-widest">
              — Galatians 3:28
            </p>
            <p className="text-muted-foreground border-border/60 border-t pt-2">
              <strong className="text-foreground font-bold">
                Catholic Faith & Privacy Protection:
              </strong>{' '}
              The Catholic Church affirms the sacred divine dignity of every human person created in
              the image and likeness of God. Before Our Lord Jesus Christ and His Holy Church, all
              parishioners are equal brothers and sisters in faith. Community category options
              reflect approved parish register requirements for official census administration and
              are kept strictly confidential — accessible only to authorized Parish Office clergy
              and administration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

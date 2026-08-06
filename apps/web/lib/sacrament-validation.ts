export function calculateAge(dobString: string): number {
  if (!dobString) return 0;
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age >= 0 ? age : 0;
}

export interface SacramentValidationErrors {
  dob?: string;
  baptismDate?: string;
  firstCommunionDate?: string;
  confirmationDate?: string;
  marriageDate?: string;
}

export function validateMemberDates(memberData: {
  dob: string;
  baptism?: { completed: boolean; date?: string };
  firstCommunion?: { completed: boolean; date?: string };
  confirmation?: { completed: boolean; date?: string };
  marriage?: { completed: boolean; date?: string };
}): SacramentValidationErrors {
  const errors: SacramentValidationErrors = {};
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (!memberData.dob) {
    errors.dob = 'Date of birth is required';
    return errors;
  }

  const dob = new Date(memberData.dob);
  if (isNaN(dob.getTime())) {
    errors.dob = 'Invalid date of birth format';
    return errors;
  }

  if (dob > today) {
    errors.dob = 'Date of birth cannot be in the future';
  }

  // Baptism Validation
  if (memberData.baptism?.completed && memberData.baptism.date) {
    const bDate = new Date(memberData.baptism.date);
    if (isNaN(bDate.getTime())) {
      errors.baptismDate = 'Invalid baptism date';
    } else if (bDate > today) {
      errors.baptismDate = 'Baptism date cannot be in the future';
    } else if (bDate < dob) {
      errors.baptismDate = 'Baptism date cannot occur before date of birth';
    }
  }

  // First Holy Communion Validation
  if (memberData.firstCommunion?.completed && memberData.firstCommunion.date) {
    const fcDate = new Date(memberData.firstCommunion.date);
    if (isNaN(fcDate.getTime())) {
      errors.firstCommunionDate = 'Invalid First Communion date';
    } else if (fcDate > today) {
      errors.firstCommunionDate = 'First Communion date cannot be in the future';
    } else if (fcDate < dob) {
      errors.firstCommunionDate = 'First Communion cannot occur before date of birth';
    } else if (
      memberData.baptism?.completed &&
      memberData.baptism.date &&
      fcDate < new Date(memberData.baptism.date)
    ) {
      errors.firstCommunionDate = 'First Communion cannot occur before Baptism date';
    }
  }

  // Confirmation Validation
  if (memberData.confirmation?.completed && memberData.confirmation.date) {
    const cDate = new Date(memberData.confirmation.date);
    if (isNaN(cDate.getTime())) {
      errors.confirmationDate = 'Invalid Confirmation date';
    } else if (cDate > today) {
      errors.confirmationDate = 'Confirmation date cannot be in the future';
    } else if (cDate < dob) {
      errors.confirmationDate = 'Confirmation cannot occur before date of birth';
    } else if (
      memberData.firstCommunion?.completed &&
      memberData.firstCommunion.date &&
      cDate < new Date(memberData.firstCommunion.date)
    ) {
      errors.confirmationDate = 'Confirmation cannot occur before First Communion date';
    }
  }

  // Marriage Validation
  if (memberData.marriage?.completed && memberData.marriage.date) {
    const mDate = new Date(memberData.marriage.date);
    const minAdultDate = new Date(dob);
    minAdultDate.setFullYear(minAdultDate.getFullYear() + 18);

    if (isNaN(mDate.getTime())) {
      errors.marriageDate = 'Invalid marriage date';
    } else if (mDate > today) {
      errors.marriageDate = 'Marriage date cannot be in the future';
    } else if (mDate < minAdultDate) {
      errors.marriageDate = 'Marriage cannot occur before adulthood (minimum 18 years after birth)';
    }
  }

  return errors;
}

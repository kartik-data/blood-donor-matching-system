// Blood group compatibility chart: who can donate to whom
const compatibilityMap = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], // universal donor
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"], // can only donate to AB+
};

function isCompatible(donorGroup, requiredGroup) {
  return compatibilityMap[donorGroup]?.includes(requiredGroup) || false;
}

function scoreDonor(donor, request) {
  let score = 0;

  if (donor.isAvailable) score += 50;
  if (donor.city.toLowerCase() === request.city.toLowerCase()) score += 30;

  if (donor.lastDonationDate) {
    const daysSinceLastDonation =
      (Date.now() - new Date(donor.lastDonationDate).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastDonation >= 90) score += 20;
    else score -= 20;
  } else {
    score += 20;
  }

  return score;
}

function findMatchingDonors(allDonors, request) {
  return allDonors
    .filter((donor) => isCompatible(donor.bloodGroup, request.bloodGroup))
    .map((donor) => ({ donor, matchScore: scoreDonor(donor, request) }))
    .sort((a, b) => b.matchScore - a.matchScore);
}

// Hospitals need an EXACT blood group match (no donor-style compatibility) -
// a hospital either has that exact type in stock or it doesn't.
function scoreHospital(hospital, request, units) {
  let score = 0;
  if (hospital.city.toLowerCase() === request.city.toLowerCase()) score += 50;
  score += Math.min(units, 20) * 2; // more units = higher confidence, capped
  return score;
}

function findMatchingHospitals(allHospitals, request) {
  return allHospitals
    .map((hospital) => {
      const item = hospital.inventory.find((i) => i.bloodGroup === request.bloodGroup);
      const units = item ? item.units : 0;
      return { hospital, units, matchScore: scoreHospital(hospital, request, units) };
    })
    .filter((entry) => entry.units > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = { isCompatible, scoreDonor, findMatchingDonors, findMatchingHospitals };
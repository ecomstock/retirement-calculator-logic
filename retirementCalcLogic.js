/********
VARIABLES
********/

//USER VARIABLES
let expectancy = 90 //Life expectancy
let initialAge = 45 //Current age
let averageMonthlyIncome = 3000 //Montly income after taxes
let initialIncome = averageMonthlyIncome * 12
let annualIncome = 50000 //Annual income before taxes
let incomeDeflator = 85 //Post-tax income needed in retirement, expressed as a portion of 100
let socialSecurityEligibility = true
let pensionEligibility = true

//USER FINANCIAL ASSETS
let initial401k = 10000 //Current 401k/403b balance
let x401kContribution = 1000 //Annual 401k/403b contribution
let initialIRA = 3000 //Current conventional IRA balance
let IRAContribution = 500 //Annual conventional IRA contribution
let initialRoth = 2000 //Current Roth IRA balance
let rothContribution = 0 //Annual Roth IRA contribution
let initialOther = 1000 //Total current balance of private stocks, bonds, mututal funds, ETFs, etc.
let otherContribution = 1000 //Annual contribution to private stocks, bonds, etc.
let pensionAge = 65 //Pension eligibility age
let annualPension 

//Estimate annual pension benefit. Multiply years of service by annual income and a fixed percent, usually around 1.5%.
if (pensionEligibility === true) {
	annualPension = 10 * annualIncome * .015
} else {
	annualPension = 0
}

//Estimate annual social security benefit, which increases at a decreasing rate with higher incomes and tops out around $3000/month.
let socialSecurityAge = 62 //Age of first SS withdrawal
let socialSecurity
if (socialSecurityEligibility = false || annualIncome < 3000) {
	socialSecurity = 0
}
if (socialSecurityEligibility = true) {
	if (annualIncome < 3000) {
		socialSecurity = 0
	} else if (annualIncome >= 3000 && annualIncome < 11000) {
		socialSecurity = annualIncome * .075 / 12
	} else if (annualIncome >= 11000 && annualIncome < 27000) {
		socialSecurity = 1000
	} else if (annualIncome >= 27000 && annualIncome < 35000) {
		socialSecurity = 1200
	} else if (annualIncome >= 35000 && annualIncome < 42000) {
		socialSecurity = 1400
	} else if (annualIncome >= 42000 && annualIncome < 58000) {
		socialSecurity = 1800
	} else if (annualIncome >= 58000 && annualIncome < 80000) {
		socialSecurity = 2200
	} else if (annualIncome >= 80000 && annualIncome < 113000) {
		socialSecurity = 2600
	} else if (annualIncome >= 113000) {
		socialSecurity = 3000
	}
}
let annualSocialSecurity = socialSecurity * 12

//MACROECONOMIC VARIABLES -- ALL VALUES EXPRESSED AS A PORTION OF 100
let inflation = 2.0 //Average annual inflation
let effectiveTaxRate = 14 //Average federal income tax rate
let stateTaxRate = 10 //Average state/local tax rate. Includes income, sales, and property taxes.
let capitalGainsTax = 0 //Federal tax rate for sales of regular stock. Currently zero for individual incomes up to $35k/year.
let preRetirementGains = 9 //Average annual pre-retirement returns on all accounts. 
let retirementGains = 6 //Average annual post-retirement returns on all accounts. 
let standardTaxAdjustment = effectiveTaxRate + stateTaxRate
let capitalGainsAdjustment = capitalGainsTax + stateTaxRate

//PROGRAM VARIABLES
let loopContinue = true
let ageTracker = 0
let incomeTracker = 0
let remainingIncome = 0
let working = 0
let retirement = expectancy - initialAge - working
let x401kTracker = 0
let x401kContributionTracker = 0
let IRATracker = 0
let IRAContributionTracker = 0
let rothTracker = 0
let rothContributionTracker = 0
let otherTracker = 0
let otherContributionTracker = 0
let withdrawal = 0
let reassigner = 0

/*******************************************************
1. RESET TRACKER VARIABLES WITH EACH MAIN LOOP ITERATION
*******************************************************/
let setSimulationParameters = () => {
  ageTracker = 0
  incomeTracker = 0
  checkingTracker = 0
  savingsTracker = 0
  pensionTracker = 0
  socSecTracker = 0
  x401kTracker = 0
  IRATracker = 0
  rothTracker = 0
  otherTracker = 0
  ageTracker = ageTracker + initialAge
  incomeTracker = incomeTracker + initialIncome
  pensionTracker = pensionTracker + annualPension
  socSecTracker = socSecTracker + annualSocialSecurity
  x401kTracker = x401kTracker + initial401k
  x401kContributionTracker = x401kContributionTracker + x401kContribution
  IRATracker = IRATracker + initialIRA
  IRAContributionTracker = IRAContributionTracker + IRAContribution
  rothTracker = rothTracker + initialRoth
  rothContributionTracker = rothContributionTracker + rothContribution
  otherTracker = otherTracker + initialOther
  otherContributionTracker = otherContributionTracker + otherContribution
}

/***************************************************
EVERY YEAR: INCREMENT AGE & CALCULATE COST OF LIVING
***************************************************/
let oneYearPassed = () => {
  ageTracker++
  incomeTracker = incomeTracker * (1 + inflation * .01)
	socSecTracker = socSecTracker * (1 + inflation * .01)
	pensionTracker = pensionTracker * (1 + inflation * .01)
	reassigner = 0
  console.log("Age: " + ageTracker)
  console.log("Total income: " + incomeTracker)
	console.log("Projected SS income: " + socSecTracker)
	console.log("Projected pension income: " + pensionTracker)
  console.log(otherContributionTracker + " contributed to " + otherTracker + " in stocks")
  console.log(x401kContributionTracker + " contributed to " + x401kTracker + " in 401k")
  console.log(IRAContributionTracker + " contributed to " + IRATracker + " in IRA")
  console.log(rothContributionTracker + " contributed to " + rothTracker + " in Roth")
  console.log("-----")
}

/****************************
2. LOOP THROUGH WORKING YEARS
****************************/
let workingAndSaving = () => {
  for (j = 0; j < working; j++) {
    console.log("WORKING")
    x401kTracker = x401kTracker * (1 + preRetirementGains * .01) + x401kContributionTracker
    x401kContributionTracker = x401kContributionTracker * (1 + inflation * .01)
    IRATracker = IRATracker * (1 + preRetirementGains * .01) + IRAContributionTracker
    IRAContributionTracker = IRAContributionTracker * (1 + inflation * .01)
    rothTracker = rothTracker * (1 + preRetirementGains * .01) + rothContributionTracker
    rothContributionTracker = rothContributionTracker * (1 + inflation * .01)
    otherTracker = otherTracker * (1 + preRetirementGains * .01) + otherContributionTracker
    otherContributionTracker = otherContributionTracker * (1 + inflation * .01)
    oneYearPassed()
  }
}

//RETIREMENT FUNCTIONS
withdrawalInflator = (taxAdjustment, penalty) => {
  return (1 + taxAdjustment * .01) * penalty
}

/***************************************************
3. STOP ACCOUNT CONTRIBUTIONS WHEN RETIREMENT STARTS
***************************************************/
setRetirementParameters = () => {
  x401kContributionTracker = 0
  otherContributionTracker = 0
  rothContributionTracker = 0
  IRAContributionTracker = 0
}

/*************************************
UNDER 60 WITHDRAWAL FUNCTIONS (STEP 4)
*************************************/
checkRoth = () => {
  if (rothTracker >= remainingIncome * withdrawalInflator(standardTaxAdjustment, 1.1)) {
		makeAwithdrawal(standardTaxAdjustment, 1.1, rothTracker, "Roth IRA")
    rothTracker = reassigner + 0
    appreciation()
    oneYearPassed()
  } 
}

checkIRA = () => {
  if (IRATracker >= remainingIncome * withdrawalInflator(standardTaxAdjustment, 1.1)) {
		makeAwithdrawal(standardTaxAdjustment, 1.1, IRATracker, "IRA")
    IRATracker = reassigner + 0
    appreciation()
    oneYearPassed()
  } else {
		makeApartialWithdrawal(standardTaxAdjustment, 1.1, IRATracker, "IRA")
    IRATracker = 0
    checkRoth()
  }
}

check401k = () => {
  if (x401kTracker >= remainingIncome * withdrawalInflator(standardTaxAdjustment, 1.1)) {
    makeAwithdrawal(standardTaxAdjustment, 1.1, x401kTracker, "401(k)")
    x401kTracker = reassigner + 0
    appreciation()
    oneYearPassed()
  } else {
		makeApartialWithdrawal(standardTaxAdjustment, 1.1, x401kTracker, "401(k)")
    x401kTracker = 0
    checkIRA()
  }
}

/************************************
OVER 60 WITHDRAWAL FUNCTIONS (STEP 4)
*************************************/
checkOther60 = () => {
  if (otherTracker >= remainingIncome * withdrawalInflator(capitalGainsAdjustment, 1)) {
		makeAwithdrawal(capitalGainsAdjustment, 1, otherTracker, "stocks")
		otherTracker = reassigner + 0
		appreciation()
		oneYearPassed()
  } 
}

checkRoth60 = () => {
  if (rothTracker >= remainingIncome * withdrawalInflator(standardTaxAdjustment, 1)) {
		makeAwithdrawal(standardTaxAdjustment, 1, rothTracker, "Roth IRA")
    rothTracker = reassigner + 0
    appreciation()
    oneYearPassed()
  } else {
		makeApartialWithdrawal(standardTaxAdjustment, 1, rothTracker, "Roth")
    rothTracker = 0
    checkOther60()
  }
}

checkIRA60 = () => {
  if (IRATracker >= remainingIncome * withdrawalInflator(standardTaxAdjustment, 1)) {
		makeAwithdrawal(standardTaxAdjustment, 1, IRATracker, "IRA")
		IRATracker = reassigner + 0
		appreciation()
		oneYearPassed()
  } else {
		makeApartialWithdrawal(standardTaxAdjustment, 1, IRATracker, "IRA")
    IRATracker = 0
    checkRoth60()
  }
}

//WITHDRAWAL & APPRECIATION FUNCTIONS
appreciation = () => {
  console.log("401k appreciated " + ((x401kTracker * (1 + retirementGains * .01)) - x401kTracker))
  x401kTracker = x401kTracker * (1 + retirementGains * .01)
  console.log("IRA appreciated " + ((IRATracker * (1 + retirementGains * .01)) - IRATracker))
  IRATracker = IRATracker * (1 + retirementGains * .01)
  console.log("Roth appreciated " + ((rothTracker * (1 + retirementGains * .01)) - rothTracker))
  rothTracker = rothTracker * (1 + retirementGains * .01)
  console.log("Stocks appreciated " + ((otherTracker * (1 + retirementGains * .01)) - otherTracker))
  otherTracker = otherTracker * (1 + retirementGains * .01)
}

makeAwithdrawal = (adjustment, penalty, accountTracker, accountName) => {
  console.log("Remaining income: " + remainingIncome)
  console.log("Withdrawal inflator: " + ((1 + adjustment * .01) * penalty))
  withdrawal = remainingIncome * ((1 + adjustment * .01) * penalty)
  console.log(`${withdrawal} withdrawn from ${accountName}.`)
  reassigner = accountTracker - withdrawal //Allows account balance to be used outside of this function
  remainingIncome = 0
  console.log("New balance: " + accountTracker)
  withdrawal = 0
}

makeApartialWithdrawal = (adjustment, penalty, accountTracker, accountName) => {
	console.log("Remaining income: " + remainingIncome)
	console.log("Withdrawal inflator: " + withdrawalInflator(adjustment, penalty))
	remainingIncome = remainingIncome - accountTracker / withdrawalInflator(adjustment, penalty)
	console.log(`${accountTracker} withdrawn from ${accountName}.`)
}

/*************************
4. RETIREMENT INCOME LOGIC
*************************/
let retiredAndWithdrawing = () => {
  //DETERMINE INCOME NEEDS
  incomeTracker = incomeTracker * (incomeDeflator * .01)
  //LOOP THROUGH RETIREMENT YEARS
  for (k = 0; k < retirement; k++) {
    console.log("RETIRED")
    remainingIncome = incomeTracker + 0
    //DEFINED BENEFIT INCOME (PENSION & SOCIAL SECURITY)
    if (ageTracker >= pensionAge) {
      remainingIncome = remainingIncome - pensionTracker / (1 + standardTaxAdjustment * .01)
      console.log("ANNUAL PENSION: " + pensionTracker / (1 + standardTaxAdjustment * .01))
      pensionTracker = pensionTracker * (1 + inflation * .01)
    }
    if (ageTracker >= socialSecurityAge) {
      remainingIncome = remainingIncome - socSecTracker / (1 + standardTaxAdjustment * .01)
      console.log("ANNUAL SOCIAL SECURITY: " + socSecTracker / (1 + standardTaxAdjustment * .01))
      socSecTracker = socSecTracker * (1 + inflation * .01)
    } 
		//EARLY RETIREMENT INCOME: 1. STOCKS, 2. 401K, 3. IRA, 4. ROTH
    if (ageTracker < 60) {
      if (otherTracker >= remainingIncome * ((1 + capitalGainsAdjustment * .01) * 1)) {
        makeAwithdrawal(capitalGainsAdjustment, 1, otherTracker, "stocks")
        otherTracker = reassigner + 0
        appreciation()
        oneYearPassed()
      } else {
				makeApartialWithdrawal(capitalGainsAdjustment, 1, otherTracker, "stocks")
        otherTracker = 0
        check401k()
      }
      if (remainingIncome > 0) {
        break
      }
		//REGULAR RETIREMENT INCOME: 1. 401K, 2. IRA, 3. ROTH, 4. STOCKS
    } else if (ageTracker >= 60) {
      if (x401kTracker >= remainingIncome * withdrawalInflator(standardTaxAdjustment, 1)) {
				makeAwithdrawal(standardTaxAdjustment, 1, x401kTracker, "401(k)")
        x401kTracker = reassigner + 0
        appreciation()
        oneYearPassed()
      } else {
				makeApartialWithdrawal(standardTaxAdjustment, 1, x401kTracker, "401(k)")
        x401kTracker = 0
        checkIRA60()
      }
      if (remainingIncome > 0) {
        break
      }
    }
  }
}

let success = () => {
  console.log("You may be able to retire at " + (initialAge + working))
}

/****************
*** MAIN LOOP ***
****************/
while (loopContinue) {
	//STEP 1
  setSimulationParameters()
	//STEP 2
  workingAndSaving()
	//STEP 3
  setRetirementParameters()
	//STEP 4 
  retiredAndWithdrawing()
  if (expectancy - ageTracker <= 0) {
    success()
    loopContinue = false
  } else {
    working++
  } 
}

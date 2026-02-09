/**
 * Calculates tax based on income using progressive tax slabs
 * @param {number} income - Annual income
 * @returns {object} Tax amount and slab-wise breakdown
 */
function calculateTax(income) {
    let tax = 0;

    // Slab A: Up to 250,000 - 0% tax
    if (income <= 250000) {
        return {
            tax: 0,
            slabBreakdown: {
                slabA: 0,
                slabB: 0,
                slabC: 0,
                slabD: 0,
                surcharge: 0
            }
        };
    }

    const slabBreakdown = {
        slabA: 0,
        slabB: 0,
        slabC: 0,
        slabD: 0,
        surcharge: 0
    };

    // Slab B: 250,001 to 500,000 - 10% tax
    if (income > 250000) {
        const taxableInSlabB = Math.min(income - 250000, 250000);
        slabBreakdown.slabB = taxableInSlabB * 0.10;
        tax += slabBreakdown.slabB;
    }

    // Slab C: 500,001 to 1,000,000 - 20% tax
    if (income > 500000) {
        const taxableInSlabC = Math.min(income - 500000, 500000);
        slabBreakdown.slabC = taxableInSlabC * 0.20;
        tax += slabBreakdown.slabC;
    }

    // Slab D: Above 1,000,000 - 25% tax
    if (income > 1000000) {
        const taxableInSlabD = income - 1000000;
        slabBreakdown.slabD = taxableInSlabD * 0.25;
        tax += slabBreakdown.slabD;
    }

    // Surcharge: If tax > 50,000, additional 5% on amount exceeding 50,000
    if (tax > 50000) {
        slabBreakdown.surcharge = (tax - 50000) * 0.05;
        tax += slabBreakdown.surcharge;
    }

    return {
        tax: Math.round(tax * 100) / 100,
        slabBreakdown
    };
}

/**
 * Optimizes tax distribution by distributing salaries equally
 * Equal distribution minimizes total tax with progressive taxation
 * @param {number} numEmployees - Number of employees
 * @param {number} totalPay - Total annual payroll
 * @returns {object} Optimized distribution results
 */
function optimizeTaxDistribution(numEmployees, totalPay) {
    // To minimize total tax with progressive taxation, distribute equally
    const salaryPerEmployee = totalPay / numEmployees;

    const employees = [];
    let totalTax = 0;

    for (let i = 0; i < numEmployees; i++) {
        const { tax, slabBreakdown } = calculateTax(salaryPerEmployee);
        const takeHome = salaryPerEmployee - tax;

        employees.push({
            employeeIndex: i + 1,
            salary: Math.round(salaryPerEmployee * 100) / 100,
            taxOutgo: Math.round(tax * 100) / 100,
            takeHomeSalary: Math.round(takeHome * 100) / 100,
            slabBreakdown
        });

        totalTax += tax;
    }

    return {
        employees,
        totalTax: Math.round(totalTax * 100) / 100,
        totalTakeHome: Math.round((totalPay - totalTax) * 100) / 100,
        averageTaxRate: Math.round((totalTax / totalPay) * 10000) / 100
    };
}

module.exports = {
    calculateTax,
    optimizeTaxDistribution
};

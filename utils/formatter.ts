 export function formatJobType(value: any): string {
    if (value == "FullTime") {
        return "Full Time";
    } else if (value == "PartTime") {
        return "Part Time";
    } else if (value == "Internship") {
        return "Internship";
    } else if (value == "Internship") {
        return "Internship";
    } else if (value == "Contract") {
        return "Contract";
    } else if (value == "Temporary") {
        return "Temporary";
    }
    return "Other";
}
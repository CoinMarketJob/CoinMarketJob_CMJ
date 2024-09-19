import { Frequency } from "@prisma/client";

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

export function formatFrequency(value: Frequency | undefined): number{
    if (value == "AlmostNothing") {
        return 0;
    } else if (value == "Monthly") {
        return 25;
    } else if (value == "Weekly") {
        return 50;
    } else if (value == "Daily") {
        return 75;
    } 
    return 100;
}

export function formatValueToFrequency(value: number): string{
    if (value == 0) {
        return "AlmostNothing";
    } else if (value == 25) {
        return "Monthly";
    } else if (value == 50) {
        return "Weekly";
    } else if (value == 75) {
        return "Daily";
    } 
    return "PrettyMuchEverything";
}

export function formatSalary(value: number){
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1).replace(/\.0$/, '') + "M"; // 1.2M gibi
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, '') + "K"; // 250K gibi
    }
    return value; // Eğer 1000'den küçükse direkt olarak döndür
  }
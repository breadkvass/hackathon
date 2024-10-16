export type Team = {
    id: number,
    name: string,
    create_date: Date,
    stress_level: number,
    employee_count: number,
    average_hard_skills: string,
    average_soft_skills: string,
    employees: Employee[],
    users?: number[]
    bus_factor: number
}

export type Employee = {
    id: number,
    first_name: string,
    last_name: string,
    job_title: string,
    grade: string,
    competence: Competence,
    teams: string[]
}

export type Competence = {
    hard_skills: number;
    soft_skills: number;
}
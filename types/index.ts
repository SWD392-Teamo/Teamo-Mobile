export type Profile = {
    id: number
    code: string
    firstName: string
    lastName: string
    email: string
    gender: string
    dob: Date
    imgUrl: string
    description: string
    majorCode: string
    links: Link[]  
    studentSkills: StudentSkill[] 
}

export type Link = {
    id: number
    name: string
    url: string
}

export type StudentSkill = {
    id: number
    skillName: string
    skillType: string
    skillLevel: string
}

export type Application = {
    id: number
    groupName: string
    studentName: string
    studentEmail: string
    imgUrl: string
    requestTime: Date
    requestContent: string
    groupPositionName: string
    status: string
}
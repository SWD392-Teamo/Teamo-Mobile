export type PagedResult<T> = {
    data: T[]
    pageIndex: number
    pageSize: number
    count: number
}

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
    groupId:number
    groupName: string
    studentName: string
    studentEmail: string
    imgUrl: string
    documentUrl: string
    requestTime: Date
    requestContent: string
    groupPositionName: string
    status: string
}

export type Major = {
    id: number
    code: string
    name: string
    subjects: Subject[]
}

export type Subject = {
    id: number
    code: string
    name: string
    description: string
    fields: Field[]
}

export type Field = {
    id: number
    name: string
    description: string
}

export type GroupMember = {
    groupId: number;
    studentId: number;
    studentName: string;
    studentEmail: string;
    imgUrl: string;
    positions: string[];
    role: string;
}

export type GroupPosition = {
    id: number;
    name: string;
    count: number;
    status: string;
}

export type Group = {
    id: number;
    name: string;
    title: string;
    semesterName: string;
    description: string;
    createdAt: string;
    createdByUserName: string;
    maxMember: number;
    imgUrl: string;
    groupMembers: GroupMember[];
    status: string;
    fieldName: string;
    subjectCode: string;
    totalMembers: number;
    totalGroupPositions: number;
    totalApplications: number;
    groupPositions: GroupPosition[];
    applications: Application[];
}

// Generic type for loadMore function
export type LoadMoreFunction<T> = (
    page: number,
    currentData: T[],
    urlFn: (page: number) => string,
    fetchFn: (url: string) => Promise<PagedResult<T>>,
    appendFn: (items: T[]) => void
  ) => Promise<{
    hasMore: boolean;
    newPage: number;
  }>;
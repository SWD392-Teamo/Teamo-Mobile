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

export type StudentSkillToAdd = {
    skillId: number
    level: string
}

export type Application = {
    id: number
    groupId:number
    groupName: string
    studentId: number
    studentName: string
    studentEmail: string
    imgUrl: string
    documentUrl: string
    requestTime: Date
    requestContent: string
    groupPositionId: number
    groupPositionName: string
    status: string
}

export type Major = {
    id: number
    code: string
    name: string
    imgUrl: string
    subjects: Subject[]
}

export type Subject = {
    id: number
    code: string
    name: string
    description: string
    imgUrl: string
    fields: Field[]
}

export type Field = {
    id: number
    name: string
    description: string
}

export type GroupMember = {
    id: number
    groupId: number
    studentId: number
    studentName: string
    studentEmail: string
    imgUrl: string
    positionIds: number[]
    positions: string[]
    role: string
}

export type GroupMemberToAdd = {
    studentId: number
    groupPositionIds: number[]
}
    
export type Skill = {
    id: number
    name: string
    type: string
}

export type Group = {
    id: number
    name: string
    title: string
    description: string
    semesterName: string
    createdAt: Date
    createdByUserName: string
    maxMember: number
    status: string
    fieldName: string
    subjectCode: string
    subjectId: number
    imgUrl: string
    groupMembers: GroupMember[]
    groupPositions: GroupPosition[]
    applications: Application[]
    totalMembers: number
    totalPositions: number
    totalApplications: number
}

export type GroupToCreate = {
    name: string
    title: string
    description: string
    semesterId: number,
    maxMember: number,
    fieldId: number,
    subjectId: number,
    groupPositions: GroupPositionToAdd[]
}

export type GroupPosition = {
    id: number
    name: string
    count: number
    status: string
    skills: Skill[]
}

export type GroupPositionToAdd = {
    name: string
    count: number
    skillIds: number[]
}

export type Semester = {
    id: number
    name: string
    code: string
    startDate: Date
    endDate: Date
    status: string
}

export type Post = {
  id: number;
  groupId: number;
  studentId: number;
  groupName: string;
  groupMemberName: string;
  groupMemberImgUrl: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
  documentUrl?: string;
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
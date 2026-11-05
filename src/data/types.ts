export type ProjectId =
  'autofacsigo' | 'forogood' | 'bookstore' | 'moviestream' | 'jobboard'

// Unión discriminada: el campo `kind` dice qué otros campos existen.
export type ProjectVideo =
  | { kind: 'youtube'; id: string }
  | { kind: 'file'; src: string; poster?: string }

export type Project = {
  id: ProjectId
  name: string
  tech: string[]
  // Capturas: 1 o 2 imágenes (la segunda es opcional).
  images: string[]
  links: {
    repo?: string
    demo?: string
  }
  video?: ProjectVideo
}

export type ServiceId = 'backend' | 'cloud' | 'frontend' | 'delivery'

export type SkillGroupId =
  'backend' | 'cloud' | 'frontend' | 'quality' | 'tools' | 'learning' | 'soft'

// Las habilidades blandas se traducen (son frases); las técnicas son nombres propios.
export type SoftSkillId =
  | 'teamLeadership'
  | 'clientCommunication'
  | 'estimation'
  | 'timeManagement'
  | 'documentation'

export type SkillGroup =
  | { id: Exclude<SkillGroupId, 'soft'>; items: string[] }
  | { id: 'soft'; items: SoftSkillId[] }

export type EducationId = 'sena' | 'oracleAlura' | 'freeCodeCamp' | 'uniminuto'

export type Education = {
  id: EducationId
  institution: string
  period?: string
  // pendingDegree: plan de estudios terminado, falta la ceremonia/título.
  status: 'completed' | 'inProgress' | 'pendingDegree'
  // Imagen del diploma; si no existe (estudio en curso) no se muestra el botón.
  diploma?: string
}

export type ExperienceId = 'ginko' | 'megasoft' | 'bluechemical'

export type Experience = {
  id: ExperienceId
  organization?: string
  period: string
}

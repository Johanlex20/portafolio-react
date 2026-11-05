import type { SkillGroup } from '@/data/types'

// Tecnologías que giran en el carrusel de la portada.
export const marqueeTech = [
  'Java',
  'Spring Boot',
  'AWS',
  'Angular',
  'TypeScript',
  'API Gateway',
  'lambda',
  'S3',
  'CloudFront',
  'Secrets Manager',
  'Parameter Store',
  'Microservices',
  'Kubernetes',
  'Docker',
  'Next.js',
  'React',
  'DynamoDB',
  'SQS',
  'DLQ',
  'GitLab CI/CD',
  'SonarQube',
  'Jira',
  'JUnit 5',
  'Mockito',
  'HTML5',
  'CSS3',
  'CLAUDE',
]

// Criterio: "En construcción" solo incluye lo que Johan todavía no usa a diario
// en producción (p. ej. Terraform: hoy lo lee, no lo escribe).
export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    items: [
      'Java 8/ 11 / 17 / 21',
      'Spring Boot',
      'Spring Security',
      'JPA / Hibernate',
      'Microservices',
      'REST API',
      'Maven',
      'Oracle',
      'PostgreSQL',
      'MySQL',
    ],
  },
  {
    id: 'cloud',
    items: [
      'AWS',
      'DynamoDB',
      'lambda',
      'API Gateway',
      'SQS + DLQ',
      'S3',
      'CloudFront',
      'Secrets Manager',
      'Parameter Store',
      'IAM',
      'Docker',
      'Kubernetes',
      'Linux (Ubuntu Server)',
      'Cloudflare Tunnel',
    ],
  },
  {
    id: 'frontend',
    items: [
      'Next.js',
      'React',
      'Angular',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Sass',
    ],
  },
  {
    id: 'quality',
    items: [
      'JUnit 5',
      'Mockito',
      'SonarQube',
      'Fortify',
      'GitLab CI/CD',
      'GitFlow',
      'Git',
    ],
  },
  {
    id: 'tools',
    items: [
      'IntelliJ IDEA',
      'VS Code',
      'Postman',
      'DBeaver',
      'Jira',
      'Claude Code',
    ],
  },
  {
    id: 'learning',
    items: [
      'Software architecture',
      'Cloud-native design',
      'Event-driven architecture',
      'Terraform',
      'Kafka / SNS',
      'Spring Cloud',
    ],
  },
  // Al final a propósito: son complemento, no el centro del perfil técnico.
  {
    id: 'soft',
    items: [
      'teamLeadership',
      'clientCommunication',
      'estimation',
      'timeManagement',
      'documentation',
    ],
  },
]

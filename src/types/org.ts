export interface OrgNode {
  id: string;
  name: string;
  role: string;
  avatarSrc: string;
  department?: string;
  children?: OrgNode[];
}


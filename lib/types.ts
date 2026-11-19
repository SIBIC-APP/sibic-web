export type Candidate = {
  id: string;
  slug: string;
  name: string;
  party: string;
  partyColor: string;
  office: string;
  age: number | null;
  bio: string;
  background: string;
  photoUrl: string;
  sortOrder: number;
};

export type Theme = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  sortOrder: number;
};

export type Proposal = {
  id: string;
  candidateId: string;
  themeId: string;
  title: string;
  summary: string;
  body: string;
  sourceLabel: string;
  sourceDocument: string;
  sourceSection: string;
};

export type Catalog = {
  candidates: Candidate[];
  themes: Theme[];
  proposals: Proposal[];
};

export type CompassResponse = {
  id: string;
  userId: string;
  questionId: string;
  value: string;
  updatedAt: string;
};

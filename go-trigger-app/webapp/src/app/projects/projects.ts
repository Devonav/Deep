export interface Project {
  id: number;
  name: string;
  description: string; // Required field
  imageUrl: string;    // Changed from 'image'
  githubUrl?: string;  // Changed from 'github'
  websiteUrl?: string; // Changed from 'website'
  technologies?: string[];
  npm?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Project1',
    description: 'Description for Project 1', // Added required field
    imageUrl: 'assets/projects/my-awesome-image.png', // Changed from 'image'
    githubUrl: 'https://github.com/Izaacapp/my-awesome-project', // Changed from 'github'
    websiteUrl: 'https://myawesomeproject.com', // Changed from 'website'
    npm: ''
  },
  {
    id: 2,
    name: 'Project2',
    description: 'Description for Project 2', // Added required field
    imageUrl: 'assets/projects/project2-image.png', // Changed from 'image'
    githubUrl: 'https://github.com/YourUsername/project2', // Changed from 'github'
    websiteUrl: 'https://project2website.com', // Changed from 'website'
    npm: 'https://www.npmjs.com/package/project2'
  }
];
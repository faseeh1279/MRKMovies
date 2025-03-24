
export interface UploadMovie{ 
    // Movie Detail
    title?: string; 
    description?: string; 
    genres?: string[]; 
    poster?: string;
    // Actor Detail
    actors?: string[]; 
    release_date?: string; 
    directors?: string[]; 
    created_at?: string; 
    duration?: string;
    // Confirmation Detail
    confirmSubmission?:boolean | string;  
}
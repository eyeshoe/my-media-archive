import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://rjbggndyjluuyfqsncec.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqYmdnbmR5amx1dXlmcXNuY2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjA5NjYsImV4cCI6MjA2NDEzNjk2Nn0.Hz251lsJhiTcol9128reuruw4chbgNSuYIMRrHy-0iA'; // Replace this with your anon key from the API settings
const supabase = createClient(supabaseUrl, supabaseKey);

// Media operations
export const mediaOperations = {
    // Create a new media entry
    async create(mediaData) {
        const { data, error } = await supabase
            .from('media')
            .insert([mediaData])
            .select();
        
        if (error) throw error;
        return data;
    },

    // Get all media entries of a specific type
    async getByType(type, limit = null) {
        let query = supabase
            .from('media')
            .select('*')
            .eq('type', type)
            .order('date', { ascending: false });
        
        if (limit) {
            query = query.limit(limit);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Get a single media entry by ID
    async getById(id) {
        const { data, error } = await supabase
            .from('media')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    },

    // Update a media entry
    async update(id, updates) {
        const { data, error } = await supabase
            .from('media')
            .update(updates)
            .eq('id', id)
            .select();
        
        if (error) throw error;
        return data;
    },

    // Delete a media entry
    async delete(id) {
        const { error } = await supabase
            .from('media')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    }
};

// Authentication operations
export const authOperations = {
    // Sign in with email and password
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        return data;
    },

    // Sign out
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Get current session
    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    }
};

// Storage operations
export const storageOperations = {
    // Upload an image
    async uploadImage(file, path) {
        const { error } = await supabase.storage
            .from('media-images')
            .upload(path, file);
        
        if (error) throw error;
    },

    // Get image URL
    getImageUrl(path) {
        return supabase.storage
            .from('media-images')
            .getPublicUrl(path)
            .data.publicUrl;
    },

    // Delete an image
    async deleteImage(path) {
        const { error } = await supabase.storage
            .from('media-images')
            .remove([path]);
        
        if (error) throw error;
    }
}; 
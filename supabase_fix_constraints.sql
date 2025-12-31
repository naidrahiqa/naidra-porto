DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    -- Loop mencari semua constraint tipe 'Unique' (u) di tabel projects
    FOR r IN (SELECT conname FROM pg_constraint WHERE conrelid = 'public.projects'::regclass AND contype = 'u') 
    LOOP 
        -- Hapus constraint yang ditemukan
        EXECUTE 'ALTER TABLE public.projects DROP CONSTRAINT ' || quote_ident(r.conname); 
    END LOOP; 
END $$;

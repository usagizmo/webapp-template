-- Seed the storage.buckets table with the default buckets
insert into storage.buckets
  (id, name, public, avif_autodetection, file_size_limit)
values
  ('comments', 'comments', true, false, 5242880);

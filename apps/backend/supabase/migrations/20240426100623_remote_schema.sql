CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Give all users access"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'comments'::text));


create policy "Give users access to own folder (DELETE)"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'comments'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'comments'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));




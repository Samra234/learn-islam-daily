# Security Specification: Learn Islam Daily

## 1. Data Invariants
- A user bookmark cannot be created with a `userId` that does not match `request.auth.uid`.
- Content collections (`ayahs`, `hadith`, `duas`, `quotes`, `reminders`, `articles`) are publicly readable when `published == true`.
- Content collections can only be created, modified, or deleted by authenticated administrators (`isAdmin()`).
- User profile data in `/users/{userId}` can only be read and written by the authenticated user themselves.
- Unauthenticated users cannot read non-published content or create bookmarks.

## 2. The Dirty Dozen Payloads (Targeting Exploits)
1. **User Spoofing on Bookmark**: `POST /bookmarks/bm1` with `incoming().userId = "victim123"` when `auth.uid = "attacker"`. (Must return PERMISSION_DENIED)
2. **Ghost Field Poisoning**: `POST /bookmarks/bm2` with arbitrary hidden keys `{"isAdmin": true}`. (Must return PERMISSION_DENIED)
3. **Public Content Manipulation**: `POST /ayahs/fake-ayah` from unauthenticated client. (Must return PERMISSION_DENIED)
4. **Self-Promote Admin**: `POST /admins/{attackerUid}` by non-admin user. (Must return PERMISSION_DENIED)
5. **Overlong String Injection**: `POST /ayahs/a1` with 100KB garbage text in `arabic`. (Must return PERMISSION_DENIED)
6. **Cross-User Bookmark Reading**: `GET /bookmarks/bm_victim` from another authenticated user. (Must return PERMISSION_DENIED)
7. **Cross-User Profile Reading**: `GET /users/victim123` from another user. (Must return PERMISSION_DENIED)
8. **Draft Content Exfiltration**: `GET /ayahs/unpublished1` with `published = false` by unauthenticated visitor. (Must return PERMISSION_DENIED)
9. **Blanket Query Scraping**: `QUERY /bookmarks` without filtering `userId == request.auth.uid`. (Must return PERMISSION_DENIED)
10. **Malicious Delete**: `DELETE /articles/art1` by regular authenticated user. (Must return PERMISSION_DENIED)
11. **Malicious Content Mutation**: `UPDATE /hadith/h1` altering hadith text without admin privileges. (Must return PERMISSION_DENIED)
12. **Empty / Corrupt Content Creation**: `POST /duas/d1` with missing required fields `arabic` or `title`. (Must return PERMISSION_DENIED)

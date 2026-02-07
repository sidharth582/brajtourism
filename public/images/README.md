Place your package images in this folder so they are served by the dev server at /images/<filename>.

Recommended filenames (so the site finds them easily):
- package1.jpg
- package2.jpg
- package3.jpg
- package4.jpg
- package5.jpg
- package6.jpg

Usage in your React components (example):

<img src="/images/package1.jpg" alt="Package 1" className="w-full h-full object-cover" />

Notes:
- Files placed in `public/` are served at the site root. For example, `public/images/package1.jpg` is available at `https://localhost:5173/images/package1.jpg` when running the dev server.
- You can use any image format (jpg, png, webp). Keep dimensions similar for consistent layout (e.g., 600x400).
- After adding images, refresh the page in the browser to see them. No build step is necessary for dev server; if using a production build, ensure the images are included or served from a CDN.

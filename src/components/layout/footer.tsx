export default function Footer() {
  return (
    <footer className="bg-card shadow-inner py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Kosha Explorer. All rights reserved.</p>
        <p className="text-sm mt-1">Exploring the synergy of body, mind, and spirit.</p>
      </div>
    </footer>
  );
}

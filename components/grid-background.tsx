"use client"

const GridBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white bg-grid-main-tertiary/[0.5] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </main>
  )
}
export default GridBackground
export default function Badge({ children, color = 'plum' }) {
  const colors = {
    plum: 'bg-plum-100 text-plum-700',
    beige: 'bg-beige-100 text-beige-500',
    gold: 'bg-gradient-to-r from-beige-300 to-beige-400 text-white',
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-body ${colors[color]}`}>
      {children}
    </span>
  )
}

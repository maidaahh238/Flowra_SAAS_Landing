const colors = [
  'bg-plum-200 text-plum-800',
  'bg-beige-300 text-plum-800',
  'bg-lavender-200 text-plum-800',
  'bg-rose-soft text-plum-800',
]

export default function Avatar({ initials = '?', size = 'md', index = 0 }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' }
  const color = colors[index % colors.length]
  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center font-sans font-semibold flex-shrink-0`}>
      {initials}
    </div>
  )
}

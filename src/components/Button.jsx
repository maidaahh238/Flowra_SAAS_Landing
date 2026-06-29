export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }
  const variants = {
    primary: 'bg-plum-600 text-white hover:bg-plum-700 shadow-plum hover:shadow-lg hover:-translate-y-0.5 focus:ring-plum-400',
    secondary: 'bg-beige-200 text-plum-800 hover:bg-beige-300 focus:ring-beige-400',
    outline: 'border-2 border-plum-300 text-plum-700 hover:bg-plum-50 focus:ring-plum-300',
    ghost: 'text-plum-600 hover:bg-plum-50 focus:ring-plum-300',
    gold: 'bg-gradient-to-r from-beige-400 to-beige-500 text-white hover:from-beige-500 hover:to-beige-400 shadow-beige hover:shadow-lg hover:-translate-y-0.5 focus:ring-beige-300',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

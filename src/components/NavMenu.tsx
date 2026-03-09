import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons'

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [
    {
      to: '/',
      label: <FontAwesomeIcon icon={faHouse} aria-label="Home" />,  },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ]

  const menuRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={menuRef}
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleToggle() : undefined}
      aria-expanded={isOpen}
      aria-label="Toggle navigation menu"
      className="group relative hover:bg-secondary-background rounded-lg p-2 transition-colors duration-300 ease-out cursor-pointer"
    >
        <FontAwesomeIcon
          icon={faBars}
          className={`text-xl text-primary-grey group-hover:text-primary transition-transform duration-300 ease-out  ${
            isOpen ? 'rotate-360' : 'rotate-0'
          }`}
        />

      {isOpen && (
        <nav
          className="absolute right-0 mt-2 flex w-40 flex-col gap-2 rounded-xl bg-primary-background/50 backdrop-blur-md p-2 shadow-lg z-10"
          style={{ animation: 'dropdownIn 220ms ease-out forwards' }}
        >
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleClose}
              className={({ isActive }) =>
                ` rounded-[5px] p-2 text-center transition-all duration-300 ease-out  ${
                  isActive
                    ? 'bg-primary text-primary-background font-semibold backdrop-blur-md'
                    : 'bg-secondary-background/50 hover:-translate-x-1 text-primary-grey backdrop-blur-md'
                }`
              }
              style={{
                opacity: 0,
                transform: 'translateY(10px)',
                animation: `fadeSlideIn 360ms ease-out ${index * 90}ms forwards`,
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      <style>{`
        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default NavMenu
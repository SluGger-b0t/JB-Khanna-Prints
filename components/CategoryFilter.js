'use client'

import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

function DropdownPortal({ children, position, onClose }) {
  const portalRef = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      if (portalRef.current && !portalRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  if (!position) return null

  return ReactDOM.createPortal(
    <div
      ref={portalRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: 208,
        zIndex: 9999,
      }}
      className="bg-white border border-[#2f4f4f]/10 rounded-xl shadow-lg overflow-hidden"
    >
      {children}
    </div>,
    document.body
  )
}

const CategoryFilter = ({
  categories,
  subcategoriesByCategory,
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [dropdownPosition, setDropdownPosition] = useState(null)

  const closeDropdown = () => {
    setExpandedCategory(null)
    setDropdownPosition(null)
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <div key={category} className="relative">
          <button
            onClick={(e) => {
              onSelectCategory(category)
              if (expandedCategory === category) {
                closeDropdown()
              } else {
                setExpandedCategory(category)
                const rect = e.currentTarget.getBoundingClientRect()
                setDropdownPosition({
                  top: rect.bottom + window.scrollY + 8,
                  left: rect.left + rect.width / 2 - 104 + window.scrollX,
                })
              }
            }}
            className={`px-6 py-2 rounded-full text-sm transition-all duration-300 border ${
              selectedCategory === category
                ? 'bg-[#2f4f4f] text-white border-[#2f4f4f]'
                : 'bg-transparent text-[#2f4f4f] border-[#2f4f4f]/20 hover:border-[#2f4f4f]'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>

          {expandedCategory === category &&
            subcategoriesByCategory[category]?.length > 0 && (
              <DropdownPortal position={dropdownPosition} onClose={closeDropdown}>
                <ul className="py-2">
                  <li>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#f7e0ab]/30 ${
                        selectedSubcategory === 'all'
                          ? 'font-semibold text-[#2f4f4f]'
                          : 'text-[#2f4f4f]/70'
                      }`}
                      onClick={() => {
                        onSelectSubcategory('all')
                        closeDropdown()
                      }}
                    >
                      All Subcategories
                    </button>
                  </li>
                  {subcategoriesByCategory[category].map((subcat) => (
                    <li key={subcat}>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#f7e0ab]/30 ${
                          selectedSubcategory === subcat
                            ? 'font-semibold text-[#2f4f4f]'
                            : 'text-[#2f4f4f]/70'
                        }`}
                        onClick={() => {
                          onSelectSubcategory(subcat)
                          closeDropdown()
                        }}
                      >
                        {subcat}
                      </button>
                    </li>
                  ))}
                </ul>
              </DropdownPortal>
            )}
        </div>
      ))}
    </div>
  )
}

export default CategoryFilter

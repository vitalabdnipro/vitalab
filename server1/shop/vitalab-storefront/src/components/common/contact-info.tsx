import React from "react"

/**
 * ContactInfo component displays additional contact information with phone numbers.
 * This component is used across news pages to avoid code duplication.
 */
const ContactInfo: React.FC = () => {
  return (
    <p className="px-4 text-m">
      Додаткова інформація за телефонами:
      <a
        className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
        href="tel:+380673105227"
      >
        (067) 310-52-27,
      </a>
      <a
        className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
        href="tel:+3800503607575"
      >
        (050) 360-75-75
      </a>
      ,
      <a
        className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
        href="tel:+380632510338"
      >
        (063) 251-03-38
      </a>
    </p>
  )
}

export default ContactInfo
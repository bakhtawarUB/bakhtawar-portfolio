import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="site wrap">
      <span>
        &copy; {new Date().getFullYear()} {profile.name}
      </span>
      <span>{profile.location}</span>
    </footer>
  )
}
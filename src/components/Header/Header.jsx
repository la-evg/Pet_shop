// import { useNavigate } from 'react-router-dom'
// // import { SearchBar } from '../SearchBar/SearchBar'
// // import headerStyles from './header.module.scss'
// import { TokenLSkey } from '../../utils/constants'
import { BottomHeader } from './BottomHeader/BottomHeader'
import { TopHeader } from './TopHeader/TopHeader'
/* eslint-disable */
export const Header = () => {

  return (
    <header>
      <TopHeader />
      <BottomHeader />
    </header>
  )
}


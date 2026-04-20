import { APP_SECTION_ORDER as sectionOrder } from './layout/AppView/appData'
import AppView from './layout/AppView/AppView'

function App() {
    return <AppView sectionOrder={sectionOrder} />
}

export default App

export default function Footer() {

    return (
        <footer className="footer mt-auto py-3 md-light" style={{
            'position': 'absolute',
            'left': '0',
            'bottom': '0',
            'right': '0',
        }}>
            <nav className="navbar navbar-expand-md bg-white navbar-light border-top">
                <div className="container-fluid px-5 justify-content-end pt-2">
                        <div className="ps-5">The dataset is updated once a week on Thursday.</div>
                        <div className="ps-5">Source code:  <a href="https://github.com/VovaMorugin/COVID-Safety-Network">GitHub</a></div>
                        <div className="ps-5">Data source:  <a href="https://sdgis-sandag.opendata.arcgis.com/">San Diego Open GIS Data Portal</a></div>
                    </div>
            </nav>
        </footer>
    )
}
import subprocess
import os
# pyrefly: ignore [missing-import]
import webview

# Ruta al build del frontend
RUTA_FRONTEND = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist')
RUTA_INDEX = os.path.join(RUTA_FRONTEND, 'index.html')
ANCHO_VENTANA = 1280
ALTO_VENTANA = 800


class ApiVentana:
    """Clase que expone funciones Python al frontend mediante js_api."""

    def __init__(self, ventana=None):
        self._ventana = ventana

    def minimizar_ventana(self):
        if self._ventana:
            self._ventana.minimize()

    def maximizar_ventana(self):
        if self._ventana:
            if self._ventana.maximized:
                self._ventana.restore()
            else:
                self._ventana.maximize()

    def cerrar_ventana(self):
        if self._ventana:
            self._ventana.destroy()


def generar_build_frontend():
    """Genera el build de producción del frontend."""
    ruta_frontend = os.path.join(os.path.dirname(__file__), '..', 'frontend')
    subprocess.run(['npm', 'run', 'build'], cwd=ruta_frontend, check=True, shell=True)


def iniciar_aplicacion():
    """Punto de entrada principal de la aplicación desktop."""
    if not os.path.exists(RUTA_INDEX):
        print('Build no encontrado. Generando...')
        generar_build_frontend()

    # Instanciamos la API y la pasamos como js_api a create_window
    api = ApiVentana()

    ventana = webview.create_window(
        title='Pokédex',
        url=f'file:///{RUTA_INDEX}',
        width=ANCHO_VENTANA,
        height=ALTO_VENTANA,
        frameless=True,
        resizable=True,
        js_api=api
    )

    # Vinculamos la ventana creada al objeto api
    api._ventana = ventana

    webview.start(debug=False)


if __name__ == '__main__':
    iniciar_aplicacion()
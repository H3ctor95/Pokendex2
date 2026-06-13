import webview

window = webview.create_window(
    title='Pokedex',
    url='https://pokeapi.co',
    width=1024,
    height=700,
)

if __name__ == '__main__':
    webview.start()
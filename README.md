# webGLproject  

W repozytorium znajdują się 4 projekty stworzone z użyciem biblioteki Three.js.

## Uruchomienie: 
W celu uruchomienia projektów należy uruchomić prosty serwer HTTP w katalogu z skopiowanym repozytorium 
a następnie otworzyć w przeglądarce plik project.html przypisany do wybranego projektu.  

### Przykładowe uruchomienie serwera HTTP na systemie Linux:  

Wywołać komendę python -m SimpleHTTPServer w katalogu projektu:  

![run-server-linux](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/linux-run-server.png)  

Przykładowe uruchomienie serwera HTTP na systemie Windows:  


Połączyć się z serwerem poprzez przeglądarkę:  

![connect-server](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/connect-server.png)      

Uruchomić wybrany projekt:  

![run-project](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/run-project.png)    

## Floating object:  

Projekt pierwszy to prosta animacja przedstawiająca obiekt poruszający się w górę i w dół.  

![Floating object](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/floating-onject.png)

## Skybox:

Drugi projekt przedstawia skybox stworzony z wykorzystaniem Three.js.  

![skybox](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/skybox.png)  

## Skybox with fire:

Trzeci projekt przedstawia płomień stworzony z cząstek umieszczony wewnątrz skybox'a.  

![Skybox with fire](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/skybox-with-fire.png)  

## Fire in the darkness:

Czwarty projekt przedstawia ten sam płomień umieszczony wśród drzew stworzonych  
przez narzędzie SnappyTree oraz zaimportowanych za pomocą biblioteki Proctree.js  
Całość ma przedstawiać ognisko rozpalone nocą w lesie.  

![Fire in the darkness](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/fire-in-the-darkness.png)  
  

 
## Wykorzystane biblioteki:

- [Three.js](https://github.com/mrdoob/three.js/) - JavaScript 3D library.  
- [Stats.js](https://github.com/mrdoob/stats.js/) - wyświetlanie statystyk bieżącej animacji.  
- [Proctree.js](https://github.com/supereggbert/proctree.js/) - importowanie modeli drzew.  
- [Snappytree](https://github.com/supereggbert/SnappyTree) - tworzenie modeli drzew.  
- [dat.GUI](https://github.com/dataarts/dat.gui) - dynamiczna zmiana parametrów animacji. 
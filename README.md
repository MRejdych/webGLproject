# webGLproject  

W repozytorium znajdują się 4 projekty stworzone z użyciem biblioteki Three.js.

## Uruchomienie: 
W celu uruchomienia projektów należy uruchomić prosty serwer HTTP w katalogu z skopiowanym repozytorium 
a następnie otworzyć w przeglądarce plik project.html przypisany do wybranego projektu.  

### Przykładowe uruchomienie serwera HTTP na systemie Linux:  

#### Wywołać komendę python -m SimpleHTTPServer w katalogu projektu:  

![run-server-linux](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/linux-run-server.png)  


#### Połączyć się z serwerem poprzez przeglądarkę:  

![connect-server](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/connect-server.png)      

#### Uruchomić wybrany projekt:  

![run-project](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/run-project.png)    

## Floating object:  

Projekt pierwszy to prosta animacja przedstawiająca obiekt poruszający się w górę i w dół.  

![Floating object](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/floating-object.png)  

Ruch obiektu został uzyskany poprzez zmianę parametrów jego położenia oraz rotacji podczas działania pętli animacji generującej klatki.  

```javascript
function animate() {
    stats.update();
    requestAnimationFrame(animate);
    offset += controls.movingSpeed;
    icosahedron.material.color.setHex(controls.objectColor);
    icosahedron.rotation.x += controls.xRotationSpeed;
    icosahedron.rotation.z += controls.zRotationSpeed;
    icosahedron.rotation.y += controls.yRotationSpeed;
    icosahedron.position.y = 0 + ((Math.cos(offset)) / 2);
    renderer.render(scene, camera);
}

 ```  

## Skybox:

Drugi projekt przedstawia skybox stworzony z wykorzystaniem Three.js.  

![skybox](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/skybox.png)  

Skybox został utworzony poprzez nałożenie dwustronnych tekstur na obiekt w kształcie sześcianu.  

```javascript
function createSkybox() {
    let geometry = new THREE.CubeGeometry(1000, 1000, 1000);
    
    let materials = [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/rt.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/lt.jpg"), side: THREE.DoubleSide }),        
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/up.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/dn.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/fr.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("img/bk.jpg"), side: THREE.DoubleSide })
    ]
    let material =  new THREE.MeshFaceMaterial(materials);
    let skybox = new THREE.Mesh(geometry, material);
    return skybox;
}
```  


## Skybox with fire:

Trzeci projekt przedstawia płomień stworzony z cząstek umieszczony wewnątrz skybox'a.  
Płomień został uzyskany poprzez implementację niestandardowych obiektów BufferedGeometry oraz Material, która 
znajduje się w pliku js/fire.js.  

![Skybox with fire](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/skybox-with-fire.png)  

## Fire in the darkness:

Czwarty projekt przedstawia ten sam płomień umieszczony wśród drzew stworzonych  
przez narzędzie SnappyTree oraz zaimportowanych za pomocą biblioteki Proctree.js  
Całość ma przedstawiać ognisko rozpalone nocą w lesie.  
Nocną atmosferę uzyskano poprzez dodanie do sceny mgły o kolorze 0x000000.  
Światło rzucane przez ognisko uzyskano poprzez umieszczenie w jego lokalizacji źródła światła PointLight.  
Kod importujący drzewa znajduje się w pliku js/tree.js.  

![Fire in the darkness](https://github.com/MRejdych/webGLproject/blob/master/readme_imgs/fire-in-the-darkness.png)  
  
## Struktura kodu:
Każdy projekt posiada własny katalog, w którym znajdują się pliki projekt.html oraz projekt.js.  
Kod wspólny dla dwóch lub więcej projektów znajduje się w plikach w katalogu js/  
Biblioteki użyte w projektach znajdują się w katalogu libs/  

 
## Wykorzystane biblioteki:

- [Three.js](https://github.com/mrdoob/three.js/) - JavaScript 3D library.  
- [Stats.js](https://github.com/mrdoob/stats.js/) - wyświetlanie statystyk bieżącej animacji.  
- [Proctree.js](https://github.com/supereggbert/proctree.js/) - importowanie modeli drzew.  
- [Snappytree](https://github.com/supereggbert/SnappyTree) - tworzenie modeli drzew.  
- [dat.GUI](https://github.com/dataarts/dat.gui) - dynamiczna zmiana parametrów animacji. 
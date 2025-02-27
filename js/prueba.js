document.addEventListener("DOMContentLoaded", main, false);

function main(){
    // Opciones del toolbar
    // TODO añadir más fuentes
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    // Editor
    const quill = new Quill("#div-editor", {
        theme: "snow",
        modules: {
            toolbar: toolbarOptions
        },
        placeholder: 'Escriba su plantilla o arrastre y suelte su plantilla html.'


    });

    // Ejemplo de inserciones, texto e imagen
    /* 
    const Delta = Quill.import('delta');
    quill.setContents(
    new Delta()
        .insert('Hello, ')
        .insert('World', { bold: true })
        .insert('\n')
    ); 
    
    quill.insertEmbed(10, 'image', 'https://picsum.photos/200/300');
    */


    // Al soltar un achivo
    document.getElementById("div-editor").addEventListener("drop", function(e){
        e.preventDefault();
        if(e.dataTransfer.items){
            [...e.dataTransfer.items].forEach(item => {
                if(item.kind === "file" && item.type === "text/html"){
                    let file = item.getAsFile();
                    console.log(file.name);
                    let reader = new FileReader();

                    reader.onload = function(e){
                        let htmlContent = e.target.result;
                        console.log(htmlContent);
                        quill.clipboard.dangerouslyPasteHTML(htmlContent);
                    }


                    
                    // Leer el archivo como texto
                    reader.readAsText(file);
                }   
            })
        }
    })

    document.getElementById("btn-save").addEventListener("click", function(e){
        e.preventDefault();
        guardarContenido(quill)
    });
}

function guardarContenido(editor){
    const contenido = editor.getSemanticHTML();
    console.log(contenido);
    // TODO exportar el contenido del div (?)
}


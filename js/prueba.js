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

    console.log(quill);

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


    // Aplicar estilos desde un botón
    $(".btn-mask").each(function(){
        $(this).click(function(e){
            e.preventDefault();
            if(quill.getSelection() == null || quill.getSelection().length < 1){
                window.alert("Seleccione un texto para aplicar el estilo");
            }else{
                const range = quill.getSelection();
                let textSelection = quill.getText(range.index, range.length);
                let maskContent = $(e.target).attr("data-content");
                // console.log($(e.target).attr("data-content"));
                let newContent = maskContent.replace("</span>", textSelection + "</span>");
                // console.log(newContent);
                quill.deleteText(range.index, range.length);
                quill.clipboard.dangerouslyPasteHTML(range.index, newContent);
            }
        })
    })

    // Cargar plantilla desde un botón
    $(".btn-plantilla").each(function(){
        $(this).click(function(e){
            e.preventDefault();
            let contenido = $(e.target).attr("data-content");
            if(quill.getSelection() == null){
                window.alert("Seleccione un lugar en el editor para pegar el contenido");
            }else{
                quill.clipboard.dangerouslyPasteHTML(quill.getSelection().index, contenido);
            }
        })
    })
   

    document.getElementById("btn-save").addEventListener("click", function(e){
        e.preventDefault();
        guardarContenido(quill)
    });
}

function guardarContenido(editor){
    const contenido = editor.getSemanticHTML();
    console.log(contenido);
    window.alert(contenido);
    // TODO exportar el contenido del div (?)
}


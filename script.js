async function carregarXML() {
    const response = await fetch('livros.xml');
    const xmlText = await response.text();
    return new DOMParser().parseFromString(xmlText, "text/xml");
}

async function filtrarLivros() {
    const xmlDoc = await carregarXML();

    const { titulo, autor, ano, comparadorAno } = {
        titulo: document.getElementById("titulo").value.toLowerCase(),
        autor: document.getElementById("autor").value.toLowerCase(),
        ano: document.getElementById("ano").value,
        comparadorAno: document.getElementById("comparadorAno").value
    };

    const livros = Array.from(xmlDoc.getElementsByTagName("livro"));
    const resultados = livros.filter(livro => {
        const livroTitulo = livro.querySelector("titulo").textContent.toLowerCase();
        const livroAutor = livro.querySelector("autor").textContent.toLowerCase();
        const livroAno = parseInt(livro.querySelector("ano").textContent);

        const filtroTitulo = !titulo || livroTitulo.includes(titulo);
        const filtroAutor = !autor || livroAutor.includes(autor);
        const filtroAno = !ano || (comparadorAno === "maior" ? livroAno > ano : livroAno < ano);

        return filtroTitulo && filtroAutor && filtroAno;
    });

    const tbody = document.querySelector("#resultados tbody");
    tbody.innerHTML = ""; 

    if (resultados.length) {
        resultados.forEach(livro => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${livro.querySelector("titulo").textContent}</td>
                <td>${livro.querySelector("autor").textContent}</td>
                <td>${livro.querySelector("ano").textContent}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        const row = document.createElement("tr");
        row.innerHTML = '<td colspan="3">Nenhum resultado encontrado.</td>';
        tbody.appendChild(row);
    }
}

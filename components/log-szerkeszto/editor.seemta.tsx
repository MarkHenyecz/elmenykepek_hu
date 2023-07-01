export const formatSeeMTALog = (data: string, removeDefault: boolean) => {
    let splitData = data.split('\n')

    splitData = splitData.filter(item => 
        item.includes('***') || // me
        item.includes('<<') || // ame
        (item.includes('*') && item.includes('((')) || // do
        item.includes('mondja') //say
    ) 

    const formattedData: string[] = []

    splitData.forEach(line => {
        const roleplaySide = line.split('[Output] : ')[1]

        if(removeDefault) {
            if(
                roleplaySide.includes('becsatolta') ||
                roleplaySide.includes('kicsatolta') ||
                roleplaySide.includes('bezárta') ||
                roleplaySide.includes('kinyitotta') ||
                roleplaySide.includes('elővett egy telefont') ||
                roleplaySide.includes('elrakott egy telefont') ||
                (roleplaySide.includes('kinyitotta egy') && roleplaySide.includes('oldalajtaját')) ||
                (roleplaySide.includes('bezárta egy') && roleplaySide.includes('ajtaját')) ||
                (roleplaySide.includes('kinyitotta egy') && roleplaySide.includes('ajtaját')) ||
                (roleplaySide.includes('leállította egy') && roleplaySide.includes('motorját')) ||
                (roleplaySide.includes('beindította egy') && roleplaySide.includes('motorját')) ||
                (roleplaySide.includes('felhúzza a') && roleplaySide.includes('ablakot')) ||
                (roleplaySide.includes('lehúzza a') && roleplaySide.includes('ablakot')) ||
                roleplaySide.includes('iszik valamit') ||
                roleplaySide.includes('eszik valamit') ||
                roleplaySide.includes('elővette a szolgálati tabletjét') ||
                roleplaySide.includes('elrakta a szolgálati tabletjét') ||
                roleplaySide.includes('becsatolta biztonsági övét') ||
                roleplaySide.includes('kicsatolta biztonsági övét') ||
                roleplaySide.includes('felrak egy villogót egy járműre') ||
                roleplaySide.includes('levesz egy villogót egy járműről') ||
                roleplaySide.includes('elrakott egy fegyvert') ||
                roleplaySide.includes('elővett egy fegyvert') ||
                roleplaySide.includes('egy közelben lévő kaput') ||
                roleplaySide.includes('SMS-t kapott') ||
                roleplaySide.includes('Csörög a telefonja') ||
                roleplaySide.includes('levette a jelvényét') ||
                roleplaySide.includes('kivett egy tárgyat a jármű csomagtartójából') ||
                roleplaySide.includes('berakott egy tárgyat a jármű csomagtartójába') ||
                roleplaySide.includes('megmotozott valakit. (') ||
                roleplaySide.includes('kidobott egy tárgyat a szemetesbe. (') ||
                roleplaySide.includes('elrejtett egy fegyvert. (') ||
                roleplaySide.includes('belenézett a csomagtartóba') ||
                roleplaySide.includes('felkapcsolta') ||
                roleplaySide.includes('(())') ||
                roleplaySide.includes('())') ||
                roleplaySide.includes('lekapcsolta')
            )
                return;
        }

        if(roleplaySide.includes('***')) 
            formattedData.push(`<p style="color: #c2a2da">${roleplaySide}</p>`)

        if(roleplaySide.includes('<<')) 
            formattedData.push(`<p style="color: #956cb4">${roleplaySide}</p>`)

        if(roleplaySide.includes('*') && roleplaySide.includes('((')) 
            formattedData.push(`<p style="color: #ff2850">${roleplaySide}</p>`)

        if(roleplaySide.includes('mondja') && !roleplaySide.includes('[R')) 
            formattedData.push(`<p style="color: #ffffff">${roleplaySide}</p>`)
        
        if(roleplaySide.includes('mondja') && roleplaySide.includes('[R')) 
            formattedData.push(`<p style="color: #00CED1">${roleplaySide}</p>`)
    });


    return formattedData;
}
export const formatOctansLog = (data: string, removeDefault: boolean) => {
    let splitData = data.split('\n')

    splitData = splitData.filter(item => 
        item.includes('suttogja') || // whisper
        item.includes('ordítja') || // shout
        item.includes('kiabálja') || // shout
        item.includes(' * ') || // me
        // item.includes('>') || // ame
        // item.includes('[ame]') || // ame
        (item.includes('*') && item.includes('((')) || // do
        item.includes('halkan') || //low
        item.includes('mondja') //say
    ) 

    const formattedData: string[] = []

    splitData.forEach(line => {
        const splitData = line.split('] ');

        if(splitData.length > 1)
            splitData.shift();

        const roleplaySide = splitData.join('] ')

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
                roleplaySide.includes('felvesz egy') ||
                roleplaySide.includes('elővesz egy telefont') ||
                roleplaySide.includes('eltesz egy telefont') ||
                roleplaySide.includes('lekapcsolta')
            )
                return;
        }

        if(roleplaySide.includes('* ') && !roleplaySide.includes('mondja') && !roleplaySide.includes('suttogja')) {
            formattedData.push(`<p style="color: #c2a2da">${roleplaySide}</p>`)
        }

        if(roleplaySide.includes('>') || roleplaySide.includes('[ame]')) 
            formattedData.push(`<p style="color: #c2a2da">${roleplaySide.replaceAll('[ame]', '>')}</p>`)

        if(roleplaySide.includes('*') && roleplaySide.includes('((')) 
            formattedData.push(`<p style="color: #ff2850">${roleplaySide}</p>`)

        if(roleplaySide.includes('mondja') && !roleplaySide.includes('halkan') || roleplaySide.includes('ordítja')) {
            let data = `<p style="color: #ffffff">${roleplaySide}</p>`;

            data.split('*').forEach((element, key) => {
                if (key % 2 == 0) {
                    data = data.replace(element, `${element} <span style="color: #c2a2da">`)
                } else {
                    data = data.replace(element+"*", `${element+"*"}</span>`)
                }
            });

            formattedData.push(data)
        }

        if(roleplaySide.includes('kiáltja') || roleplaySide.includes('halkan') || roleplaySide.includes('suttogja')) {
            let data = `<p style="color: #afafaf">${roleplaySide}</p>`;

            data.split('*').forEach((element, key) => {
                if (key % 2 == 0) {
                    data = data.replace(element, `${element} <span style="color: #c2a2da">`)
                } else {
                    data = data.replace(element+"*", `${element+"*"}</span>`)
                }
            });

            formattedData.push(data)
        }
    });


    return formattedData;
}
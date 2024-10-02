
export function getClientID(): string {
    const platform = 'WEB'; 
    const userAgent = navigator.userAgent;
    const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)[\/\s]([\d.]+)/);
    const browser = browserMatch ? browserMatch[1] : 'Unknown';
    const version = browserMatch ? browserMatch[2] : '0.0.0.0';

    const osMatch = userAgent.match(/(Windows NT|Mac OS X|Linux|Android|iOS)[\s]?([\d._]*)/);
    const os = osMatch ? osMatch[1].replace(/ /g, '') : 'Unknown';
    const osVersion = osMatch && osMatch[2] ? os + osMatch[2].replace(/_/g, '.') : os;

    const clientID = `${platform}-${browser}-${version}-${osVersion}`;
    return clientID;
}

export const okStatus = 'W0000'



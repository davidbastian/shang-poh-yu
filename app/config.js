function requireAll( requireContext ) {
    return requireContext.keys().map( requireContext );
}
var Projects = requireAll( require.context("./common/data/projects", false, /.json$/) );

import Info from './common/data/info.json';

export default function Config() {
    var config = {
        'staging': '',
        'local': '',
        'live': Projects,
        'placeholder': '',
        'copydeck': {
            projects:Projects,
            info: Info
        },
        'route': ''
    }

    return config;
}
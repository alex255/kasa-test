packadd vim-prettier

augroup cypress
	au!
	au BufWritePre <buffer> PrettierAsync
augroup end

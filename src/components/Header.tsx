export default function Header() {
    return (
        <header className="px-4 py-16 text-center sm:pb-0">
            <nav
                className="mb-8 flex justify-center"
                aria-label="Navegação principal"
            >
                <a
                    href="/"
                    className="flex items-center text-3xl font-semibold lg:text-4xl"
                    aria-label="Página inicial"
                >
                    <img
                        src="/images/padlock.svg"
                        alt="Cadeado"
                        className="mx-2 w-8"
                        loading="eager"
                    />
                    <h1 className="text-primary">Zeylock</h1>
                </a>
            </nav>
            <h2 className="mb-4 text-3xl font-bold">Gere Senhas Fortes em Segundos</h2>
            <p className="text-lg opacity-80">
                Personalize tamanho e complexidade, copie com 1 clique e mantenha suas contas seguras.
            </p>
        </header>
    );
}

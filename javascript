import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class LojaRoupas {
    private static List<Roupa> catalogo = new ArrayList<>();
    private static List<ItemCarrinho> carrinho = new ArrayList<>();

    public static void main(String[] args) {
        inicializarCatalogo();
        Scanner scanner = new Scanner(System.in);
        int opcao;

        System.out.println("=== BEM-VINDO À LOJA DE ROUPAS JAVA ===");

        do {
            System.out.println("\n--- MENU PRINCIPAL ---");
            System.out.println("1. Ver Catálogo de Roupas");
            System.out.println("2. Adicionar Item ao Carrinho");
            System.out.println("3. Ver Carrinho / Finalizar Compra");
            System.out.println("4. Sair");
            System.out.print("Escolha uma opção: ");
            opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    exibirCatalogo();
                    break;
                case 2:
                    adicionarAoCarrinho(scanner);
                    break;
                case 3:
                    gerenciarCarrinho(scanner);
                    break;
                case 4:
                    System.out.println("Obrigado por visitar nossa loja! Até logo.");
                    break;
                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        } while (opcao != 4);

        scanner.close();
    }

    private static void inicializarCatalogo() {
        catalogo.add(new Roupa("Camiseta Básica", "M", 49.90, 10));
        catalogo.add(new Roupa("Calça Jeans Slim", "42", 129.90, 5));
        catalogo.add(new Roupa("Jaqueta de Couro", "G", 259.00, 3));
        catalogo.add(new Roupa("Vestido Floral", "P", 89.90, 7));
    }

    private static void exibirCatalogo() {
        System.out.println("\n--- CATÁLOGO DE PRODUTOS ---");
        for (int i = 0; i < catalogo.size(); i++) {
            System.out.println((i + 1) + ". " + catalogo.get(i));
        }
    }

    private static void adicionarAoCarrinho(Scanner scanner) {
        exibirCatalogo();
        System.out.print("\nDigite o número do produto que deseja comprar: ");
        int indice = scanner.nextInt() - 1;

        if (indice >= 0 && indice < catalogo.size()) {
            Roupa roupaSelecionada = catalogo.get(indice);
            System.out.print("Digite a quantidade: ");
            int quantidade = scanner.nextInt();

            if (quantidade <= 0) {
                System.out.println("Quantidade inválida.");
            } else if (quantidade > roupaSelecionada.getEstoque()) {
                System.out.println("Desculpe, não temos estoque suficiente. Estoque atual: " + roupaSelecionada.getEstoque());
            } else {
                carrinho.add(new ItemCarrinho(roupaSelecionada, quantidade));
                roupaSelecionada.reduzirEstoque(quantidade); // Atualiza o estoque imediatamente
                System.out.println(quantidade + "x " + roupaSelecionada.getNome() + " adicionado(a) ao carrinho!");
            }
        } else {
            System.out.println("Produto inválido.");
        }
    }

    private static void gerenciarCarrinho(Scanner scanner) {
        if (carrinho.isEmpty()) {
            System.out.println("\nSeu carrinho está vazio.");
            return;
        }

        System.out.println("\n--- SEU CARRINHO ---");
        double total = 0;
        for (ItemCarrinho item : carrinho) {
            System.out.printf("- %s (%d unidades) - Subtotal: R$ %.2f\n", 
                    item.getRoupa().getNome(), item.getQuantidade(), item.getSubtotal());
            total += item.getSubtotal();
        }
        System.out.printf("TOTAL DA COMPRA: R$ %.2f\n", total);

        System.out.print("\nDeseja finalizar a compra? (S/N): ");
        char resposta = scanner.next().toUpperCase().charAt(0);

        if (resposta == 'S') {
            System.out.println("\nCompra finalizada com sucesso! Volte sempre.");
            carrinho.clear(); // Limpa o carrinho após a compra
        } else {
            System.out.println("\nCompra não finalizada. Os itens continuam no carrinho.");
        }
    }
}

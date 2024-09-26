<?php

namespace Database\Seeders;

use App\Models\GoodsType;
use Illuminate\Database\Seeder;

class GoodsTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            "Aço e suas ligas em lingotes, barras, perfis, bobinas, tubos e chapas",
            "Algodão em ramas, plumas, fardos prensados, em fios, bobinas e carretéis",
            "Alumínio e suas ligas em lingotes, catodos, fios, barras, perfis, bobinas e tubos",
            "Aparelho eletrônico de som e imagem, destinados à lazer e de uso doméstico",
            "Aparelhos eletrodomésticos / eletroeletrônicos",
            "Arroz e trigo",
            "Artigo de higiene pessoal e limpeza doméstica",
            "Artigos fotográficos",
            "Autopeças",
            "Bebidas alcoólicas",
            "Bicicletas (peças e acessórios)",
            "Brinquedos",
            "Café (qualquer tipo)",
            "Calçados (tênis, sapatos, chinelos sandálias, solados, palmilhas e correias)",
            "CDs (compact disc), LDs (laser disc), DVDs, fitas cassetes, fitas de vídeo, cartucho de vídeo game",
            "Cervejas e refrigerantes (latas, long neck ou pet)",
            "Charque e carne “in natura” (qualquer origem animal)",
            "Cobre (qualquer tipo), zinco, cassiterita e estanho",
            "Computadores e periféricos (computadores pessoais, impressoras, teclados, CPUs, notebooks, monitores, cartuchos de tinta e semelhantes",
            "Confecções, tecidos, fios de seda e fios têxteis",
            "Couro cru, wetblue (semi acabado) ou beneficiado",
            "Cosméticos e perfumes",
            "Defensivos agrícolas",
            "Empilhadeiras",
            "Fios e cabos elétricos",
            "Lâmpadas (reatores, luminárias e periféricos)",
            "Leite em pó ou condensado",
            "Óleos comestíveis",
            "Óleos lubrificantes",
            "Pilhas e baterias",
            "Pneus e câmaras de ar",
            "Polietileno/polipropileno/poliestireno/estireno, NBR, SBR, PVC, dióxido de titânio e demais produtos com as mesmas características físicas",
            "Polímeros de látex",
            "Produtos Alimentícios sejam ou não industrializados",
            "Produtos químicos em geral",
            "Rolamentos",
            "TDI - Tolueno Di-Isocianato",
            "Tintas e vernizes",
            "Tratores, máquinas e implementos agrícolas",
        ];

        foreach ($types as $type) {
            GoodsType::create([
                'name' => $type,
                'active' => 1
            ]);
        }
    }
}

import { test, expect } from '@playwright/test'
test(' navega para Tarefas e lista itens do backend', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Tarefas' }).click()
    await expect(page.getByRole('heading', { name: /Tarefas/i })).toBeVisible()
});
test('cria tarefa e aparece na lista', async ({ page }) => {
    await page.goto('/tasks')
    await page.getByRole('button', { name: /Adicionar Tarefa/i }).click()
    await page.getByLabel('Título:').fill('Teste E2E tarefa')
    await page.getByLabel('Descrição:').fill('Realizar testes de softwares E2E')
    await page.getByLabel('Status:').selectOption('PENDING')
    await page.getByLabel('Prioridade:').selectOption('Baixa')
    await page.getByLabel('Usuário:').selectOption({ index: 1 })
    await page.getByLabel('Categoria:').selectOption({ index: 1 })
    await page.getByRole('button', { name: /Criar/i }).click()
    await expect(page.getByRole('heading', { name: /Tarefas/i })).toBeVisible()
});
test('excluir tarefa e não aparecer mais na lista', async ({ page }) => {
    await page.goto('/tasks')
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name : /excluir/i }).first().click(
        { force: true }
    )
    await expect(page.getByRole('heading', { name: /Tarefas/i })).toBeVisible()
});

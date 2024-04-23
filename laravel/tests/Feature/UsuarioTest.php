<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioTest extends TestCase
{
    use RefreshDatabase;

    public function test_registro_usuario_exitoso()
    {
        $response = $this->postJson('/api/register', [
            'nombre' => 'Test User',
            'email' => 'test@example.com',
            'contrasena' => 'contrasena',
        ]);

        $response->assertOk();
        $response->assertJsonStructure(['success', 'authToken', 'tokenType']);
    }

    public function test_registro_usuario_fallido()
    {
        $response = $this->postJson('/api/register', [
            'nombre' => '',
            'email' => 'invalid-email',
            'contrasena' => '12345',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'errors']);
    }

    public function test_login_usuario_exitoso()
    {
        $user = Usuario::factory()->create([
            'email' => 'test@example.com',
            'contrasena' => Hash::make('contrasena'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'contrasena' => 'contrasena',
        ]);

        $response->assertOk();
        $response->assertJsonStructure(['success', 'authToken', 'tokenType']);
    }

    public function test_login_usuario_fallido()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'nonexistent@example.com',
            'contrasena' => 'invalid-constrasena',
        ]);

        $response->assertUnauthorized();
        $response->assertJsonStructure(['message']);
    }

    public function test_obtener_todos_los_usuarios()
    {
        $response = $this->getJson('/api/usuarios');

        $response->assertOk();
        $response->assertJsonStructure(['data' => []]);
    }

    public function test_obtener_usuario_por_id()
    {
        $user = Usuario::factory()->create();

        $response = $this->getJson('/api/usuarios/' . $user->id);

        $response->assertOk();
        $response->assertJsonStructure(['data' => []]);
    }

    public function test_actualizar_usuario_por_id()
    {
        $user = Usuario::factory()->create();

        $response = $this->putJson('/api/usuarios/' . $user->id, [
            'nombre' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);

        $response->assertOk();
        $response->assertJsonStructure(['success']);
    }

    public function test_eliminar_usuario_por_id()
    {
        $user = Usuario::factory()->create();

        $response = $this->deleteJson('/api/usuarios/' . $user->id);

        $response->assertOk();
        $response->assertJsonStructure(['success']);
    }
}
